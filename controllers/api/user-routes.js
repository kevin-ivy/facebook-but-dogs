const router = require('express').Router();
const {User, Bone, Dog, Review} = require("../../models");
const withAuth = require('../../utils/auth');

//Get all users
router.get('/', (req, res) => {
    //Access User and find all Users. Exclude passwords from results
    User.findAll({
        attributes: { exclude: ['password'] }
        })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

//Pull a single user based on ID
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Dog,
                attributes: [
                    'id', 
                    'name', 
                    //'location', 
                    'age',
                    'gender',
                    'breed',
                    'about'
                ]
            },
            /*{
                model: Review,
                attributes: [
                    'id', 
                    'review_text', 
                    'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },*/
            {
                model: Review,
                attributes: ['id', 'review_text', 'created_at'],
                include: {
                    model: Dog,
                    attributes: ['name']
                }
            },
            {
                model: Dog,
                attributes: ['name'],
                through: Bone,
                as: 'boned_dogs'
            }
        ]
    }).then(dbUserData => {
        if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
        }
        res.json(dbUserData);
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Create a new user account
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        location: req.body.location,
        email: req.body.email,
        password: req.body.password
    }).then(dbUserData => {
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.location = dbUserData.location;//
            req.session.loggedIn = true;
        
            res.json(dbUserData);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Login to user account
router.post('/login', (req, res) => {
    User.findOne({
    where: {
        email: req.body.email
    }
    }).then(dbUserData => {
    if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address.' });
        return;
    }

    // Verify user
    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
    }
    req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({ user: dbUserData, message: 'You are now logged in!' });
        });
    }); 
});

//Log user out of session
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

//Update User Information
router.put('/:id', (req, res) => {
    User.update(req.body, {
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
    if (!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
    }
    res.json(dbUserData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

//Delete User
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(dbUserData => {
    if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id' });
        return;
    }
    res.json(dbUserData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

module.exports = router;