const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dailyStatusSchema = new Schema({
  engineer: String,
  workOn: String,
  workItem: String,
  nextWorkItem: String,
  year: String,
  month: String,
  day: String
},
{
  timestamps: true
});
let dailyStatusModel = mongoose.model('dailyStatusModel', dailyStatusSchema);

module.exports = dailyStatusModel;