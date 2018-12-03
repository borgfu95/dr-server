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
      res.status(200).send(results);
    }).catch(function (error) {
      res.status(500).send({message: 'Get failed'});
    });
  }

  static addUserDailyStatus (req, res) {
    let data = req.body;
    return new db.dailyStatusModel(data, false).save(function (err, data) {
      if (err) {
        return res.status(500).send({message: 'Save failed'});
      }
      return res.status(200).send({message: 'Save success'});
    });
  }
}

module.exports = {
  getDailyStatusByDate: dailyStatusController.getDailyStatusByDate,
  addUserDailyStatus: dailyStatusController.addUserDailyStatus
};
