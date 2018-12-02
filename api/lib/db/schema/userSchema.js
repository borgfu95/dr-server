const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = new Schema({
  userName: String,
  password: String
},
{
  timestamps: true
});

module.exports = {
  userSchema: userSchema
};
