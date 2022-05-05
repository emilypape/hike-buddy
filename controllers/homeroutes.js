const router = require('express').Router();
const sequelize = require('../config/connection');
const { Op } = require('sequelize');
const { User, Message, Preferences } = require('../models');
const { array } = require('yargs');

// renders homepage
router.get('/', (req, res) => {
  res.render('homepage');
});

// renders signup portal
router.get('/signup', (req, res) => {
  res.render('signup');
});

// write a router.get route to use other user's ID as req.params.id instead of session.user_id so that you can click on other profile pages

// render profile.handlebars when navigating to /users/:id
router.get('/users/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.session.user_id,
    },
    attributes: ['first_name', 'last_name', 'profile_picture', 'username', 'email'],
    attributes: { exclude: ['hashed_password'] },
    include: [
      {
        model: Preferences,
        attributes: [
          'gender_identification',
          'gender_preference',
          'hike_distance',
          'hike_pace',
          'hike_with_pet',
          'hike_climate',
          'hike_in_snow',
          'water_feature',
          'mountain_peak',
          'special_equipment',
        ],
      },
    ],
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        // redirect user to 404 error page
        res.redirect('/404error');
        return;
      }
      // serialize the data
      const user = dbUserData.get({ plain: true });
      // pass to handlebars template
      res.render('profile', {
        user,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// render 404 error page
router.get('/404error', (req, res) => {
  res.render('404error');
});

// render survey.handlebars
router.get('/survey', async (req, res) => {
  if (req.session.user_id) {
    const user = await User.findByPk(req.session.user_id);
    console.log(user);
    const newUser = user.get({ plain: true });
    console.log(newUser);
    res.render('survey', { picture: newUser.profile_picture });
  } else {
    res.render('login');
  }
});

// login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect(`/users/${req.session.user_id}`);
    return;
  }
  res.render('login');
});

//signup route
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/conversation/:id', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  let messages = await Message.findAll({
    where: {
      [Op.or]: [{ sender_id: req.params.id }, { recipient_id: req.params.id }],
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
      username: user.username.slice(0, 8),
      profile_picture: user.profile_picture,
      sender_id: user.id,
      recipient_id: req.params.id,
    };
  });

  // render conversations
  res.render('conversations', {
    users,
    loggedIn: req.session.loggedIn,
  });
});

// GET conversations between recipient and sender
router.get('/conversation/:recipient_id/:sender_id', (req, res) => {
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
    order: [['createdAt', 'DESC']],
  })
    .then((dbMessageData) => {
      const users = dbMessageData.map((item) => {
        return {
          username: item.user.username,
          profile_picture: item.user.profile_picture,
          message_content: item.message_content,
        };
      });
      res.render('messages', {
        users,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// // Render feed
// router.get('/feed', (req, res) => {
//     const users = User.findAll();
//     // console.log(users.every(user => user instanceof User)); // true
//     // console.log("All users:", JSON.stringify(users, null, 2));
//     res.render('feed');
// })

// render 404 error page
router.get('/404error', (req, res) => {
  res.render('404error');
});

// render survey.handlebars
router.get('/survey', async (req, res) => {
  if (req.session.user_id) {
    const user = await User.findByPk(req.session.user_id);
    console.log(user);
    const newUser = user.get({ plain: true });
    console.log(newUser);
    res.render('survey', { picture: newUser.profile_picture });
  } else {
    res.render('login');
  }
});

// login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect(`/users/${req.session.user_id}`);
    return;
  }
  res.render('login');
});

//signup route
router.get('/signup', (req, res) => {
  res.render('signup');
});

router.get('/conversation/:id', async (req, res) => {
  console.log(req.session);
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  let messages = await Message.findAll({
    where: {
      [Op.or]: [{ sender_id: req.params.id }, { recipient_id: req.params.id }],
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
      username: user.username.slice(0, 8),
      profile_picture: user.profile_picture,
      sender_id: user.id,
      recipient_id: req.params.id,
    };
  });

  // render conversations
  res.render('conversations', {
    users,
  });
});

// GET conversations between recipient and sender
router.get('/conversation/:recipient_id/:sender_id', (req, res) => {
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
    order: [['createdAt', 'DESC']],
  })
    .then((dbMessageData) => {
      const users = dbMessageData.map((item) => {
        return {
          username: item.user.username,
          profile_picture: item.user.profile_picture,
          message_content: item.message_content,
        };
      });
      res.render('messages', {
        users,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.get('/feed', (req, res) => {
  User.findAll({
    attributes: ['first_name', 'last_name', 'profile_picture', 'username', 'email'],
    attributes: { exclude: ['hashed_password'] },
    include: [
      {
        model: Preferences,
        attributes: [
          'gender_identification',
          'gender_preference',
          'hike_distance',
          'hike_pace',
          'hike_with_pet',
          'hike_climate',
          'hike_in_snow',
          'water_feature',
          'mountain_peak',
          'special_equipment',
        ],
      },
    ],
  })
    .then((dbUserData) => {
      const users = dbUserData.map((users) => users.get({ plain: true }));
      // pass a single post object into the homepage template

      res.render('feed', {
        users,
        loggedIn: req.session.loggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
