'use strict';

const nodemailer = require('nodemailer');

class mailController {
  static sendMail (req, res) {
    let html = req.body.content;
    let host = 'mail2.augmentum.com.cn';
    let userName = 'borgfu@augmentum.com.cn';
    let password = '111111';

    let transporter = nodemailer.createTransport({
      host: host,
      secure: false,
      secureConnection: true,
      port: 25,
      auth: {
        user: userName,
        pass: password,
      },
      tls: {rejectUnauthorized: false}
    });
    var option = {
        from:"borgfu@augmentum.com.cn",
        to:"borgfu@augmentum.com.cn"
    }
    let date = new Date();
    let day = date.getDate().toString().length > 1 ? date.getDate() : '0' + date.getDate()
    option.subject = '[Services - CloudSearch] DailyStatus_' + (date.getMonth() + 1) + day + date.getFullYear();
    option.html= html;
    transporter.sendMail(option, function(error, response){
        if(error){
          return res.status(500).send({message: 'Send email failed'});
        }else{
          return res.status(200).send({message: 'Send email success'});
        }
    });
  }
}

module.exports = {
  sendMail: mailController.sendMail
};
