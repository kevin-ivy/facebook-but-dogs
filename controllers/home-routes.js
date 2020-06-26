const router = require('express').Router();
const sequelize = require('../config/connection');
const {User, Dog, Review} = require('../models');

//Load all dogs to the homepage
router.get('/', (req, res) => {
    console.log(req.session);
    Dog.findAll({
        attributes: [
            'id',
            'name',
            'location',
            'age',
            'breed',
            'about'
            ],
        include: [
            {
                model: Review,
                attributes: [
                    'id', 
                    'review_text', 
                    'dog_id', 
                    'user_id', 
                    'created_at'
                ],
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
        const dogs = dbDogData.map(dog => dog.get({ plain: true }));
        res.render('homepage', {dogs, loggedIn: req.session.loggedIn});
        }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Find Single Dog
router.get('/dog/:id', (req, res) => {    
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
            'about'
        ],
        include: [
            {
            model: Review,
            attributes: [
                'id', 
                'review_text', 
                'dog_id', 
                'user_id', 
                'created_at'
            ],
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
            res.status(404).json({message: 'No dog found with this id'});
            return;
            }
    
            // serialize the data
            const post = dbDogData.get({ plain: true });
    
            // pass data to template
            res.render('single-pet', {
                post,
                loggedIn: req.session.loggedIn
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;