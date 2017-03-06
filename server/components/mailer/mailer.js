var nodemailer = require('nodemailer');

import fs from 'fs';
import path from 'path';
import config from '../../config/environment';

function mailer() {
  var transporter = nodemailer.createTransport(config.SMTP);

  // send mail with defined transport object
  function sendMail(mailData) {
    transporter.sendMail(mailData, function(error, info) {
      if(error) {
        return console.log(error);
      }
      console.log(`Message sent: ${info.response}`);
    });
  }

  function welcome(username: string, email: string, activationLink: string) {
    try {
      return fs.readFileSync(path.resolve(__dirname, './templates/welcome.template.html'), 'utf8')
        .replace('{{username}}', username)
        .replace('{{email}}', email)
        .replace('{{activationLink}}', activationLink);
    } catch(exception) {
      console.log(exception);
    }
  }

  function passwordReset(username: string, email: string, activationLink: string) {
    return fs.readFileSync(path.resolve('server/views/email/passwordReset.template.html'), 'utf8')
      .replace('{{username}}', username)
      .replace('{{mail}}', email)
      .replace('{{activationLink}}', activationLink);
  }

  // verify connection configuration
  transporter.verify(function(error, success) {
    if(error) {
      console.log(error);
    } else {
      console.log('SMTP is ready to take our messages');
    }
  });

  return {
    sendMail,
    templates: {
      welcome,
      passwordReset
    }
  };
}

module.exports = mailer();
