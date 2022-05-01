
module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('preferences', [
      {
        id: 1,
        // user_id: 1,
        gender_identification: 'Female',
        gender_preference:'no preference',
        hike_distance:'long',
        hike_pace:'moderate',
        hike_with_pet: true,
        hike_climate: 'moderate',
        hike_in_snow: true,
        water_feature: true,
        mountain_peak: true,
        special_equipment: false,
      },
      {
        id: 2,
        // user_id: 2,
        gender_identification: 'Female',
        gender_preference:'no preference',
        hike_distance:'moderate',
        hike_pace:'fast',
        hike_with_pet: false,
        hike_climate: 'hot',
        hike_in_snow: false,
        water_feature: false,
        mountain_peak: true,
        special_equipment: true,
      },
      {
        id: 3,
        // user_id: 3,
        gender_identification: 'Male',
        gender_preference:'Male',
        hike_distance:'short',
        hike_pace:'slow',
        hike_with_pet: true,
        hike_climate: 'cold',
        hike_in_snow: true,
        water_feature: true,
        mountain_peak: false,
        special_equipment: false,
      },
      {
        id: 4,
        // user_id: 4,
        gender_identification: 'Male',
        gender_preference:'female',
        hike_distance:'long',
        hike_pace:'slow',
        hike_with_pet: false,
        hike_climate: 'moderate',
        hike_in_snow: true,
        water_feature: false,
        mountain_peak: true,
        special_equipment: true,
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('preferences', null, {});
  }
};
