const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Message, Preferences } = require('../models');


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
     attributes: { exclude: ['hashed_password']},
     include: [
     {
         model: Preferences,
         attributes: ['gender_identification', 'gender_preference', 'hike_distance', 'hike_pace', 'hike_with_pet', 'hike_climate', 'hike_in_snow', 'water_feature', 'mountain_peak', 'special_equipment']
     }
     ],
 })
 .then(dbUserData => {
     if (!dbUserData) {
         res.status(404).json ({ message: 'No user found :( Your perfect match may be hiding somewhere else!'})
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
 .catch (err => {
     console.log(err);
     res.status(500).json(err)
 })
})
module.exports = router;