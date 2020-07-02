const router = require('express').Router();
const {User, Dog, Bone, Review} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const multer = require('multer');
//const upload = multer({dest: 'public/uploads/'});

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    // reject file if not jpg or png
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(new Error('Please choose a jpg or png file to upload'), false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});


//Pull all Dogs
router.get('/', (req, res) => {
    Dog.findAll({
        attributes: [
            'id',
            'name',
            //'location',
            'age',
            'gender',
            'breed',
            'about',
            'dogImage',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM bone WHERE dog.id = bone.dog_id)'), 'bone_count']
        ],
        order: [['created_at', 'DESC']], 
        include: [
            {
            model: Review,
            attributes: [
                'id', 
                'review_text', 
                'dog_id', 
                'user_id', 
                'created_at'],
            include: {
                model: User,
                attributes: ['username']
                }
            },
            {
            model: User,
            attributes: ['username', 'location']
            }
        ]
    })
    .then(dbDogData => res.json(dbDogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get a single Dog
router.get('/:id', (req, res) => {
    Dog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            //'location',
            'gender',
            'age',
            'breed',
            'about',
            'dogImage',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM bone WHERE dog.id = bone.dog_id)'), 'bone_count']
        ],
        include: [
            {
                model: Review,
                attributes: [
                    'id', 
                    'review_text', 
                    'dog_id', 
                    'user_id', 
                    'created_at'],
            include: {
                model: User,
                attributes: ['username']
                }
            },
            {
            model: User,
            attributes: ['username', 'location']
            }
        ]
        }).then(dbDogData => {
            if (!dbDogData) {
            res.status(404).json({ message: 'No dog found with this id' });
            return;
            }
            res.json(dbDogData);
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Create a new Dog account
router.post('/', upload.single('dogImage'), (req, res) => {
    console.log(req.file);
    Dog.create({
        
        name: req.body.name,
        //location: req.body.location,
        age: req.body.age,
        gender: req.body.gender,
        breed: req.body.breed,
        about: req.body.about,
        //dogImage: req.file.path
        dogImage: req.file.filename,
        user_id: req.session.user_id
        
    })
    .then(dbDogData => res.json(dbDogData))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});


//Give Dog a Bone
router.put('/upbone', withAuth, (req, res) => {
    if (req.session) {
    Dog.upbone({ ...req.body, user_id: req.session.user_id }, { Bone, Review, User })
        .then(updatedBoneData => res.json(updatedBoneData))
        .catch(err => {
        console.log(err);
        res.status(500).json(err);
        });
    }
});

//Update Dog Information
router.put('/:id',  upload.single('dogImage'), withAuth, (req, res) => {
    console.log(req.file);
    Dog.update({
        name: req.body.name,
        //location: req.body.location,
        age: req.body.age,
        gender: req.body.gender,
        breed: req.body.breed,
        about: req.body.about,
        //dogImage: req.file.path
        dogImage: req.file.filename,
        user_id: req.session.user_id
        },
        {
            where: {
            id: req.params.id
            }
        }
    ).then(dbDogData => {
        if (!dbDogData) {
        res.status(404).json({ message: 'No dog found with this id' });
        return;
        }
        res.json(dbDogData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



//Delete Dog Account
router.delete('/:id', withAuth, (req, res) => {
    Dog.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbDogData => {
    if (!dbDogData) {
        res.status(404).json({ message: 'No dog found with this id' });
        return;
    }
    res.json(dbDogData);
    }).catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

module.exports = router;