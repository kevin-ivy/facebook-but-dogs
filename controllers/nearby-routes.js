const router = require('express').Router();

router.get('/', (req, res) => {
    const nearby = (nearby=> nearby.get({ plain: true }));
    res.render('nearby', { nearby, loggedIn: true });
  });

module.exports = router;