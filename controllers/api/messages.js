const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../../config/connection');
const { User, Message, Preferences } = require('../../models');

// get all conversations under the selected user with a get route
router.get('/:user_id', async (req, res) => {
    const userId = req.params.user_id;
    let messages = await Message.findAll({
        where: {
            [Op.or]: [
                { sender_id: userId },
                { recipient_id: userId },
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
            username: user.username,
            profile_picture: user.profile_picture,
        }
    })

    res.json(users)
    console.log(messages);
    console.log(users)
})

// get one conversation between two users with a get route (use grouping?)
router.get('/:recipient_id/:sender_id', (req, res) => {
    const recipientId = req.params.recipient_id;
    const senderId = req.params.sender_id;
    Message.findAll({
        where: {
           [Op.or]: [
            {sender_id: senderId, recipient_id: recipientId},
            { sender_id: recipientId, recipient_id: senderId }
           ]
        },
        order: [['createdAt', 'DESC']],
    }).then(dbMessageData => res.json(dbMessageData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// allow users to send a message to another user with a post route
router.post

// allow users to delete conversations with a delete route
router.delete



module.exports = router;