const router = require('express').Router();
const {Date} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//Get all play date requests
router.get('/', (req, res) => {
    Date.findAll()
    .then(dbDateData => res.json(dbDateData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//Find a single play date request
router.get('/:id', (req, res) => {
    Date.findAll({
        where: {
            dog_id: req.params.id
        }
    })
        .then(dbDateData => res.json(dbDateData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

//Create a Play Date
router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
        Date.create({
        date_text: req.body.date_text,
        dog_id: req.body.dog_id,
        user_id: req.session.user_id
        })
        .then(dbDateData => res.json(dbDateData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

//Not including options to Delete or Update Play Dates at this time

module.exports = router;