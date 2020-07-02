const router = require('express').Router();
const sequelize = require('../config/connection');
const withAuth = require('../utils/auth');
const { Dog, User, Review, Date} = require('../models');


router.get('/', withAuth, (req, res) => {
    Dog.findAll({
        where: {
            // use the ID from the session
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'name',
            'age',
            'gender',
            'breed',
            'about',
            'dogImage',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM bone WHERE dog.id = bone.dog_id)'), 'bone_count']
        ],
        include: [
            {
            model: Review,
            attributes: ['id', 'review_text', 'dog_id', 'user_id', 'created_at'],
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
    .then(dbDogData => {
        // serialize data before passing to template
        const dogs = dbDogData.map(dog => dog.get({ plain: true }));
        res.render('dashboard', { dogs, loggedIn: true });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/edit/:id', withAuth, (req, res) => {
    Dog.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'name',
            'age',
            'gender',
            'breed',
            'about',
            'dogImage',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM bone WHERE dog.id = bone.dog_id)'), 'bone_count']
        ],
        include: [
            {
            model: Review,
            attributes: ['id', 'review_text', 'dog_id', 'user_id', 'created_at'],
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
    .then(dbDogData => {
        const dog = dbDogData.get({ plain: true });

        res.render('edit-dog', {
            dog,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/dates/:id', withAuth, (req, res) => {
    Dog.findOne({
        where: {
            id: req.params.id
        },
        include: [
            {
            model: Date,
            attributes: ['date_text'],
            include: {
                model: User,
                attributes: ['username']
                }
            }
        ]
    })
    .then(dbDogData => {
        const dog = dbDogData.get({ plain: true });

        res.render('view-dates', {
            dog,
            loggedIn: true
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;