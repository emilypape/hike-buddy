const router = require('express').Router();
const { User, Message, Preferences } = require('../../models');
const sequelize = require('../../config/connection');
const { Model, DataTypes } = require('sequelize');

//user preferences survey route
router.post('/', (req, res) => {
    console.log(req)
    Preferences.create({
        // user_id = req.session.user_id,
        location_name: req.body.location_name,
        gender_identification: req.body.gender_identification,
        gender_preference: req.body.gender_preference,
        hike_distance: req.body.hike_distance,
        hike_pace: req.body.hike_pace,
        hike_with_pet: req.body.hike_with_pet,
        hike_climate: req.body.hike_climate,
        hike_in_snow: req.body.hike_in_snow,
        water_feature: req.body.water_feature,
        mountain_peak: req.body.mountain_peak,
        special_equipment: req.body.special_equipment,
        biography: req.body.biography
    })
        .then(dbPreferencesData => {
            req.session.save(() => {
                req.session.user_id = dbPreferencesData.user_id;
                req.session.username = dbPreferencesData.username;
                req.session.loggedIn = true;

                res.json(dbPreferencesData);
            });
        })

        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// *** Get help debugging this
router.get('/', (req, res) => {
    console.log(req.params)
    Preferences.findAll ({
        attributes: [
            'id',
            // 'user_id',
            'location_name',
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
            'biography'

        ],
        include: [
        {
            model: User,
            attributes:['username', 'first_name', 'last_name', 'profile_picture']
        }
        ]
    })
    .then(dbPreferencesData => res.json(dbPreferencesData))
    
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});



module.exports = router;