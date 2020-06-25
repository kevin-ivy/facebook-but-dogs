const router = require('express').Router();
const { User, Dog, Bone, Review } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//Pull all Dogs
router.get('/', (req, res) => {
    Dog.findAll({
        attributes: [
            'id',
            'name',
            'location',
            'age',
            'breed',
            'about',
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
    }).then(dbDogData => res.json(dbDogData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Get a single Dog
// get a single post
router.get('/:id', (req, res) => {
    Dog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'location',
            'age',
            'breed',
            'about',
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
        location: req.body.location,
        age: req.body.age,
        breed: req.body.breed,
        about: req.body.about,
        user_id: req.session.user_id
    }).then(dbDogData => res.json(dbDogData))
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