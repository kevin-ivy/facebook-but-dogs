const router = require('express').Router();
const sequelize = require('../config/connection');
const { Dog, Bone, User, Review } = require('../models');

router.get('/', (req, res) => {
    console.log(req.session);
    Dog.findAll({
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
                attributes: ['username', 'location']
            }
        ]
    })
    .then(dbDogData => {
    // pass a single dog object into the homepage template
    //console.log(dbDogData[0]);
        const dogs = dbDogData.map(dog => dog.get({ plain: true }));
        res.render('homepage', { dogs, loggedIn: req.session.loggedIn});
        })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

/*router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});
*/
router.get('/dog/:id', (req, res) => {
    
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
            attributes: ['username', 'location']
            }
        ]
    })
        .then(dbDogData => {
            if (!dbDogData) {
            res.status(404).json({ message: 'No dog found with this id' });
            return;
            }
    
            // serialize the data
            const dog = dbDogData.get({ plain: true });
    
            // pass data to template
            res.render('single-dog', {
                dog,
                loggedIn: req.session.loggedIn
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Request playdate with dog
router.get('/dog/:id/request-date', (req, res) => {
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
            model: User,
            attributes: ['username']
            }
        ]
    })
    .then(dbDogData => {
        const dog = dbDogData.get({ plain: true });

        res.render('request-date', {
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