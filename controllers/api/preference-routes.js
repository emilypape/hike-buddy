const router = require('express').Router();
const { User, Message, Preferences } = require('../../models');
const sequelize = require('../../config/connection');
const { Model, DataTypes } = require('sequelize');

//user preferences survey route
router.post('/', (req, res) => {
    Preferences.create({
        user_id: req.body.user_id,
        gender_identification: req.body.gender_identification,
        gender_preference: req.body.gender_preference,
        hike_distance: req.body.hike_distance,
        hike_pace: req.body.hike_pace,
        hike_with_pet: req.body.hike_with_pet,
        hike_climate: req.body.hike_climate,
        hike_in_snow: req.body.hike_in_snow,
        water_feature: req.body.water_feature,
        mountain_peak: req.body.mountain_peak,
        special_equipment: req.body.special_equipment
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

//*** Get help debugging this
// router.get('api/preferences/:user_id', (req, res) => {
//     console.log(req.params)
//     Preferences.findOne ({
//         where: {
//            user_id : req.params.user_id
//         },
//         attributes: [
//             'id',
//             'user_id',
//             'gender_identification',
//             'gender_preference',
//             'hike_distance',
//             'hike_pace',
//             'hike_with_pet',
//             'hike_climate',
//             'hike_in_snow',
//             'water_feature',
//             'mountain_peak',
//             'special_equipment',

//         ],
//         include: [
//         {
//             model: User,
//             attributes:['username', 'first_name', 'last_name', 'profile_picture']
//         }
//         ]
//     })
//     .then(dbPreferencesData => {
//         if (!dbPreferencesData) {
//             res.status(404).json({ message: 'There are no hiker surveys with this id.'});
//             return;
//         }
//         const preferences = dbPreferencesData.get({plain:true});
        
//         res.json(preferences);
//         })
       
    
//     .catch(err => {
//         console.log(err);
//         res.status(500).json(err);
//     });
// });



module.exports = router;