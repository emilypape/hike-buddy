const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Message, Preferences } = require('../models');


module.exports = router;