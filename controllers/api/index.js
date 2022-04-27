const router = require('express').Router();

const userRoutes = require('./user-routes');
const messageRoutes = require('./messages');

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);

module.exports = router;
