const router = require('express').Router();

const userRoutes = require('./user-routes');
const messageRoutes = require('./messages');
const preferenceRoutes = require('./preference-routes.js')

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/preferences', preferenceRoutes);


module.exports = router;
