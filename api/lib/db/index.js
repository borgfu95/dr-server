const mongoose = require('mongoose');
const userSchema = require('./schema/userSchema');
const dailyStatusSchema = require('./schema/dailyStatusSchema');
mongoose.connect('mongodb://localhost:27017/test');

// Models
let dailyStatusModel = mongoose.model('dailyStatusModel', dailyStatusSchema);
let userModel = mongoose.model('userModel', userSchema);

module.exports = {
  dailyStatusModel: dailyStatusModel,
  userModel: userModel
};

