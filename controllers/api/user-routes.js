const router = require('express').Router();
const { User, Message, Preferences } = require('../../models');

// make a signup portal for the user
router.post('/', (req, res) => {
    await User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        hashed_password: req.body.hashed_password
    })
})

module.exports = router;