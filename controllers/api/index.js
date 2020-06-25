const router = require('express').Router();

const userRoutes = require('./user-routes');
const dogRoutes = require('./dog-routes');
const reviewRoutes = require('./review-routes');

router.use('/users', userRoutes);
router.use('/dogs', dogRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;