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

//login route for the user
router.post('/login', (req,res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(dbUserData => {
        if(!dbUserData) {
            res.status(400).json({ message: 'There is no current user with this email address.'});
            return;
        }

        //verify user
        const validPassword = dbUserData.checkPassword(req.body.hashed_password);
        if(!validpassword) {
            res.status(400).json({message: 'Invalid Password!'});
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;

            res.json({user:dbUserData, message: 'Welcome to Hike Buddy!'});
        })
    });
});

//logout route for the user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    }
    else {
      res.status(404).end();
    }
  });

// GET /api/users/id
router.get('/:id', (req, res) => {
    User.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
        { exclude: ['hashed_password']},
        'first_name',
        'last_name',
        'profile_picture',
        'username',
        'email'
        ],
        include: [
        {
            model: Preferences,
            attributes: ['gender_indentification', 'gender_preference', 'hike_distance', 'hike_pace', 'hike_with_pet', 'hike_climate', 'hike_in_snow', 'water_feature', 'mountain_peak', 'special_equipment']
        }
        ],
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json ({ message: 'No user found :( Your perfect match may be hiding somewhere else!'})
            return;
        }
        res.json(dbUserData)
    })
    .catch (err => {
        console.log(err);
        res.status(500).json(err)
    })
})

module.exports = router;
