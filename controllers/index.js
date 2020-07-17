const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js');
const dashboardRoutes = require('./dashboard-routes.js');
const nearbyRoutes = require('./nearby-routes.js');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/nearby', nearbyRoutes);

router.use((req, res) => {
    res.status(404).end();
});

module.exports = router;