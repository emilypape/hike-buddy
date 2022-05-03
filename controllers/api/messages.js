const router = require('express').Router();
const { Op } = require('sequelize');
const sequelize = require('../../config/connection');
const { User, Message, Preferences } = require('../../models');

// get all conversations under the selected user with a get route
router.get('/:user_id', async (req, res) => {
  const userId = req.params.user_id;
  let messages = await Message.findAll({
    where: {
      [Op.or]: [{ sender_id: userId }, { recipient_id: userId }],
    },
  });

  messages = messages.reduce((acc, message) => {
    acc.add(message.sender_id);
    acc.add(message.recipient_id);
    return acc;
  }, new Set());

  let users = await User.findAll({
    where: {
      [Op.or]: Array.from(messages).map((id) => ({ id })),
    },
  });

  users = users.map((user) => {
    return {
      username: user.username,
      profile_picture: user.profile_picture,
    };
  });

  res.json(users);
});

// get one conversation between two users with a get route (use grouping?)
router.get('/:recipient_id/:sender_id', (req, res) => {
  const recipientId = req.params.recipient_id;
  const senderId = req.params.sender_id;
  Message.findAll({
    where: {
      [Op.or]: [
        { sender_id: senderId, recipient_id: recipientId },
        { sender_id: recipientId, recipient_id: senderId },
      ],
    },
    include: [
      {
        model: User,
      },
    ],
    order: [['createdAt', 'ASC']],
  })
    .then((dbMessageData) => {
      const users = dbMessageData.map((item) => {
        return {
          username: item.user.username,
          profile_picture: item.user.profile_picture,
          message_content: item.message_content,
          sender_id: item.sender_id,
          recipientId: item.recipient_id,
        };
      });
      res.json(users);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// allow users to send a message to another user with a post route
router.post('/send', (req, res) => {
  const io = req.app.get('socketio');
  const payload = req.body;

  Message.create({
    message_content: payload.message_content,
    sender_id: payload.sender_id,
    recipient_id: payload.recipient_id,
  })
    .then((dbMessageData) => res.json(dbMessageData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// allow users to delete a message with a delete route
router.delete('/delete/:id', (req, res) => {
  Message.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((dbMessageData) => {
      if (!dbMessageData) {
        res.status(404).json({ message: 'Message not found with this id!' });
        return;
      }
      res.json(dbMessageData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
