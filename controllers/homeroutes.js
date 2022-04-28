const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Message, Preferences } = require('../models');

router.get('/preferences/:id', (req, res) => {
    Preferences.findOne ({
        where: {
            id: req.params.user_id
        },
        attributes: [
            'id',
            'user_id',
            'gender_identification',
            'gender_preference',
            'hike_distance',
            'hike-pace',
            'hike_with_pet',
            'hike_climate',
            'hike_in_snow',
            'water_feature',
            'mountain_peak',
            'special_equipment',
            'created_at',

        ],
        include: [
        {
            model: User,
            attributes:['username', 'first_name', 'last_name', 'profile_picture']
        }
        ]
    })
    .then(dbPreferencesData => {
        if (!dbPreferencesData) {
            res.status(404).json({ message: 'There are no hiker surveys with this id.'});
            return;
        }
        const preferences = dbPreferencesData.get({plain:true});
        res.render('survey', {
            preferences,
            //loggedIn: req.session.loggedIn
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    });
})


module.exports = router;