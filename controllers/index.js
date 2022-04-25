const router = require('express').Router();
const { User, Message, Preferences } = require('../models');
// const apiRoutes = require('./api');

// const homeRoutes = require('./home-routes.js')

// router.use('/', homeRoutes);
// router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;