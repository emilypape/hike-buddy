
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert('messages', [
      {
          id: 1,
          message_content: 'Hello buddy!',
          sender_id: 1,
          recipient_id: 2,
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: 2,
          message_content: 'We should hike sometime!',
          sender_id: 2,
          recipient_id: 1,
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: 3,
          message_content: 'Awesome! Lets do it!',
          sender_id: 1,
          recipient_id: 2,
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: 4,
          message_content: 'Do you hike with your dog?',
          sender_id: 3,
          recipient_id: 4,
          created_at: new Date(),
          updated_at: new Date()
      },
      {
          id: 5,
          message_content: 'Yes, my dogs love to hike!',
          sender_id: 4,
          recipient_id: 3,
          created_at: new Date(),
          updated_at: new Date()
      },
      {
        id: 6,
        message_content: 'I think we would be good hike buddies!',
        sender_id: 2,
        recipient_id: 3,
        created_at: new Date(),
        updated_at: new Date()
    }

    ]);
   
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('messages', null, {});
  }
};
