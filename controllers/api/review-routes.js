const router = require('express').Router();
const {Review} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//Get all reviews
router.get('/', (req, res) => {
    Review.findAll()
    .then(dbReviewdata => res.json(dbReviewdata))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Review.findAll({
        where: {
            dog_id: req.params.id
        }
    })
        .then(dbReviewData => res.json(dbReviewData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
});

//Create a Review
router.post('/', withAuth, (req, res) => {
    // check the session
    if (req.session) {
        Review.create({
        review_text: req.body.review_text,
        dog_id: req.body.dog_id,
        user_id: req.session.user_id
        })
        .then(dbReviewData => res.json(dbReviewData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
});

//Delete a Review
router.delete('/:id', withAuth, (req, res) => {
    Review.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbReviewData => {
    if (!dbReviewData) {
        res.status(404).json({ message: 'No review found with this id' });
        return;
    }
    res.json(dbReviewData);
    })
    .catch(err => {
    console.log(err);
    res.status(500).json(err);
    });
});

module.exports = router;