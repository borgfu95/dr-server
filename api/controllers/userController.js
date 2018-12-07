'use strict';

const db = require('../lib/db');

class userController {
  static login (req, res) {
    let userName = req.body.userName;
    let password = req.body.password;
    return db.userModel.findOne({userName: userName, password: password}, {_id: 0}).then(function (data) {
      return res.status(200).send({userName: data._doc.userName});
    }).catch(function (error) {
      return res.status(500).send({message: 'User name or password error'});
    });
  }

  static register (req, res) {
    let userName = req.body.userName;
    let password = req.body.password;
    return db.userModel.findOne({userName: userName}).then(function (user) {
      if (user) {
        return res.status(400).send({message: 'User already register'});
      }
      return new db.userModel({userName: userName, password: password}, false).save().then(function (data) {
        return res.status(200).send({message: 'Register success'});
      })
    }).catch(function (error) {
      return res.status(500).send({message: 'Register failed'});
    });
  }

  static changePassword (req, res) {
    let userName = req.body.userName;
    let password = req.body.password;
    return db.userModel.findOne({userName: userName}).then(function (user) {
      if (user) {
        return res.status(400).send({message: 'User not existed'});
      }
      return db.userModel.update({userName: userName}, {password: password}).then(function (data) {
        return res.status(200).send({message: 'Change password success'});
      })
    }).catch(function (error) {
      return res.status(500).send({message: 'Change password failed'});
    });
  }
}

module.exports = {
  login: userController.login,
  register: userController.register,
  changePassword: userController.changePassword
};
