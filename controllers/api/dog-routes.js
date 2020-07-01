const router = require('express').Router();
const {User, Dog, Bone, Review} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');
const multer = require('multer');
/*
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
});

// Check File Type
function checkFileType(file, cb){
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null,true);
    } else {
    cb('Error: Images Only!');
    }
}

const upload = multer({
storage: storage,
limits: {
    fileSize: 1024 * 1024 * 5
},
fileFilter: function(req, file, cb){
    checkFileType(file, cb);
    }
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
            //'dogImage',
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
            attributes: ['username']
            }
        ]
    })
    .then(dbDogData => res.json(dbDogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});*/

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
            attributes: ['username']
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
            attributes: ['username']
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
router.post('/', withAuth, (req, res) => {
    Dog.create({
        name: req.body.name,
        //location: req.body.location,
        age: req.body.age,
        gender: req.body.gender,
        breed: req.body.breed,
        about: req.body.about,
        dogImage: req.body.dogImage,
        user_id: req.session.user_id
    })
    .then(dbDogData => res.json(dbDogData))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});
/*router.post('/upload', upload.single('dogImage'), (req, res) => {
    message : "Error! in image upload."
    if (!req.file) {
        console.log("No file received");
          message = "Error! in image upload."
        res.render('index',{message: message, status:'danger'});
    
      } else {
        console.log('file received');
        console.log(req);
        var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', '"+req.file.size+"')";
 
                var query = db.query(sql, function(err, result) {
                   console.log('inserted data');
                });
        message = "Successfully! uploaded";
        res.render('index',{message: message, status:'success'});
 
      }
});*/

/*//Create a new Dog account
router.post('/', withAuth, (req, res) => {
    Dog.create({
        name: req.body.name,
        //location: req.body.location,
        age: req.body.age,
        gender: req.body.gender,
        breed: req.body.breed,
        about: req.body.about,
        user_id: req.session.user_id
    })
    .then(dbDogData => res.json(dbDogData))
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});*/

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
router.put('/:id', withAuth, (req, res) => {
    Dog.update(req.body,
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