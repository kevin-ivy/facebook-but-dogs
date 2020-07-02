const router = require('express').Router();
const {User, Date, Dog} = require('../../models');
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
        id: req.params.id
     },
     include: [
         {
             model: Dog,
             attributes: ['name']
        },
        {
            model: User,
            attributes: ['username']
        }
     ]
  })
     .then(dbDateData => res.json(dbDateData))
     .catch(err => {
        console.log(err);
        res.status(400).json(err);
     });
});

//Find all play date requests for a single dog
router.get('/dogs/:dog_id', (req, res) => {
    Date.findAll({
       where: {
          dog_id: req.params.dog_id
       },
       include: [
           {
               model: Dog,
               attributes: ['name']
          },
          {
              model: User,
              attributes: ['username']
          }
       ]
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
        location: req.body.location,
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