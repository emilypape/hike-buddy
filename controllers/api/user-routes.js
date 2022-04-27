const router = require('express').Router();
const { User, Message, Preferences } = require('../../models');

// make a signup portal for the user
router.post('/', (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        email: req.body.email,
        hashed_password: req.body.hashed_password
    }).then(dbUserData => {
        req.session.save(() => {
            req.session.id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;