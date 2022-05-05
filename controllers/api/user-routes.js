const router = require('express').Router();
const { User, Message, Preferences } = require('../../models');

// make a signup portal for the user
router.post('/', (req, res) => {
  User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    username: req.body.username,
    email: req.body.email,
    hashed_password: req.body.hashed_password,
  })
    .then((dbUserData) => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
        req.session.profile_picture = dbUserData.profile_picture;
        res.json(dbUserData);
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

//login route for the user
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'There is no current user with this username.' });
      return;
    }

    //verify user
    const validPassword = dbUserData.checkPassword(req.body.hashed_password);
    if (!validPassword) {
      res.status(400).json({ message: 'Invalid Password!' });
      return;
    }
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;
      req.session.profile_picture = dbUserData.profile_picture;

      res.json({ user: dbUserData, message: 'Welcome to Hike Buddy!' });
    });
  });
});

//logout route for the user
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Get all users
router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] },
  })
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Get logged in user
router.get('/who-am-i', (req, res) => {
  if (req.session) {
    res.json(req.session);
  } else {
    res.status(500);
  }
});

// GET /api/users/id
router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id,
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
        res.status(404).json({ message: 'No user found :( Your perfect match may be hiding somewhere else!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
