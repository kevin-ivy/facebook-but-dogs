const router = require('express').Router();

const userRoutes = require('./user-routes');
const dogRoutes = require('./dog-routes');
const reviewRoutes = require('./review-routes');
const dateRoutes = require('./date-routes');

router.use('/users', userRoutes);
router.use('/dogs', dogRoutes);
router.use('/reviews', reviewRoutes);
router.use('/dates', dateRoutes);

module.exports = router;