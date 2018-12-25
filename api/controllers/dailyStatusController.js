'use strict';

const util = require('util');
const db = require('../lib/db');
const _ = require('lodash');

class dailyStatusController {
  static getDailyStatusByDate (req, res) {
    let year = req.swagger.params.year.value;
    let month = req.swagger.params.month.value;
    let day = req.swagger.params.day.value;
    return db.dailyStatusModel.find({year: year, month: month, day:day}, {_id: 0, _v: 0}).then(function (data) {
      let results = _.map(data, function (item) {
        return item._doc;
      });
      return res.status(200).send(results);
    }).catch(function (error) {
      return res.status(500).send({message: 'Get failed'});
    });
  }
  
  static getUserDailyStatus (req, res) {
    let year = req.swagger.params.year.value;
    let month = req.swagger.params.month.value;
    let day = req.swagger.params.day.value;
    let engineer = req.swagger.params.engineer.value;
    return db.dailyStatusModel.findOne({engineer: engineer, year: year, month: month, day:day}, {_id: 0, _v: 0}).then(function (data) {
      if (data) {
        return res.status(200).send(data._doc);
      }
      return res.status(404).send({message: 'No daily status found'});
    }).catch(function (error) {
      return res.status(500).send({message: 'Get failed'});
    });
  }

  static addOrUpdateUserDailyStatus (req, res) {
    let data = req.body;
    let condition = {engineer: data.engineer, year: data.year, month: data.month, day: data.day};
    let doc = {
      workOn: data.workOn,
      workItem: data.workItem,
      nextWorkItem: data.nextWorkItem
    };
    let options = {
      upsert: true,
      new: true
    }
     return db.dailyStatusModel.findOneAndUpdate(condition, doc, options).then(function (data) {
      if (data) {
        return res.status(200).send({message: 'Update success'});
      }
      return res.status(500).send({message: 'Update failed'});
     });
  }
}

module.exports = {
  getDailyStatusByDate: dailyStatusController.getDailyStatusByDate,
  addUserDailyStatus: dailyStatusController.addOrUpdateUserDailyStatus,
  getUserDailyStatus: dailyStatusController.getUserDailyStatus,
  updateUserDailyStatus: dailyStatusController.addOrUpdateUserDailyStatus
};
