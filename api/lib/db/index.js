const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

module.exports = {
  dailyStatusModel: require('./model/dailyStatusModel'),
  userModel: require('./model/userModel')
};

