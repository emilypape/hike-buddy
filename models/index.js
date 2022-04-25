const User = require('./User');
const Message = require('./Message');
const Preferences = require('./Preferences');

// create associations 
// User.hasMany(Message, {
//    foreignKey: 'sender_id',
//    foreignKey: 'recipient_id' 
// });

// Message.belongsTo(User, {
//     foreignKey: 'sender_id',
//     foreignKey: 'recipient_id'
// });

// User.hasOne(Preferences, {
//     foreignKey: 'user_id'
// });

// Preferences.belongsTo(User, {
//     foreignKey: 'user_id'
// });

module.exports = { User, Message, Preferences };