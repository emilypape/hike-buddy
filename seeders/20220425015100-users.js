const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        first_name: 'Emily',
        last_name: 'Pape',
        profile_picture:'https://www.gannett-cdn.com/media/2021/06/03/USATODAY/usatsports/imageForEntry18-8on.jpg?width=2560',
        username: 'eap6787',
        email: 'eap6787@gmail.com',
        hashed_password: bcrypt.hashSync('Atlas-2021', 10),
        created_at: new Date(),
        updated_at: new Date()
     },
     {
        id: 2,
        first_name: 'Juliana',
        last_name: 'Wilcox',
        profile_picture:'https://imageio.forbes.com/specials-images/imageserve/5db4c7b464b49a0007e9dfac/Photo-of-Maltese-dog/960x0.jpg?fit=bounds&format=jpg&width=960',
        username: 'JWViking',
        email: 'jwilcox@gmail.com',
        hashed_password: bcrypt.hashSync('VikingGirl34', 10),
        created_at: new Date(),
        updated_at: new Date()
     },
     {
      id: 3,
      first_name: 'Micah',
      last_name: 'Moore',
      profile_picture:'https://www.cdc.gov/healthypets/images/pets/angry-dog.jpg?_=03873',
      username: 'micahmoore95',
      email: 'mmoore@gmail.com',
      hashed_password: bcrypt.hashSync('michamoore45', 10),
      created_at: new Date(),
      updated_at: new Date()
     },
     {
      id: 4,
      first_name: 'Noah',
      last_name: 'Slusher',
      profile_picture:'https://pbs.twimg.com/media/FQi3QhyaIAAhj6Q.jpg',
      username: 'noahslusher',
      email: 'nslusher@gmail.com',
      hashed_password: bcrypt.hashSync('slushy74', 10),
      created_at: new Date(),
      updated_at: new Date()
     }
    ]);
    
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
