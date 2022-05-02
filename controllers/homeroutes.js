const router = require('express').Router();
const sequelize = require('../config/connection');
const { Op } = require('sequelize');
const { User, Message, Preferences } = require('../models');
const { array } = require('yargs');

// renders homepage
router.get('/', (req, res) => {
    res.render('homepage')
})

// renders signup portal
router.get('/signup', (req,res) => {
    res.render('signup')
})

// render profile.handlebars when navigating to /users/:id
router.get('/users/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'first_name',
            'last_name',
            'profile_picture',
            'username',
            'email'
        ],
        attributes: { exclude: ['hashed_password'] },
        include: [
            {
                model: Preferences,
                attributes: ['gender_identification', 'gender_preference', 'hike_distance', 'hike_pace', 'hike_with_pet', 'hike_climate', 'hike_in_snow', 'water_feature', 'mountain_peak', 'special_equipment']
            }
        ],
    })
        .then(dbUserData => {
            if (!dbUserData) {
                // redirect user to 404 error page
                res.redirect('/404error')
                return;
            }
            // serialize the data
            const user = dbUserData.get({ plain: true })
            // pass to handlebars template
            res.render('profile', {
                user
                // loggedIn: req.session.loggedIn,
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
})

// render 404 error page 
router.get('/404error', (req, res) => {
    res.render('404error')
})

// render survey.handlebars
router.get('/survey', (req, res) => {
    res.render('survey')
});

// login route
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login');
});

router.get('/conversation/:id', async (req, res) => {
    console.log(req.session);
    if (!req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    let messages = await Message.findAll({
        where: {
            [Op.or]: [
                { sender_id: req.params.id },
                { recipient_id: req.params.id },
            ]
        }
    });

    messages = messages.reduce((acc, message) => {
        acc.add(message.sender_id);
        acc.add(message.recipient_id);
        return acc;
    }, new Set())

    let users = await User.findAll({
        where: {
            [Op.or]: Array.from(messages).map((id) => ({id}))
        }
    })
    
    users = users.map((user) => {
        return {
            username: user.username.slice(0,8),
            profile_picture: user.profile_picture,
            sender_id: user.id,
            recipient_id: req.params.id
        }
    }) 

    // render conversations
    res.render('conversations', {
        users
    });
});

// GET conversations between recipient and sender
router.get('/conversation/:recipient_id/:sender_id', (req, res) => {
    const recipientId = req.params.recipient_id;
    const senderId = req.params.sender_id;
    Message.findAll({
        where: {
           [Op.or]: [
            {sender_id: senderId, recipient_id: recipientId},
            { sender_id: recipientId, recipient_id: senderId }
           ]
        },
        include: [{
            model: User,
        }],
        order: [['createdAt', 'DESC']],
    })
    .then(dbMessageData => {
       const users = dbMessageData.map((item) => {
            return {
                username: item.user.username,
                profile_picture: item.user.profile_picture,
                message_content: item.message_content
            }
        })
        res.render('messages', {
            users
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// render homepage


module.exports = router;