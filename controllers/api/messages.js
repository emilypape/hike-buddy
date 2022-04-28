const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../../config/connection');
const { User, Message, Preferences } = require('../../models');

// get all conversations under the selected user with a get route
router.get

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