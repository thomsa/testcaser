// sample mail data
// var mailData = {
//   from: '***REMOVED***',
//   to: '***REMOVED***',
//   subject: 'Message title',
//   text: 'Plaintext version of the message',
//   html: 'HTML version of the message'
// };

var nodemailer = require('nodemailer');

import config from '../../config/environment';

import fs from 'fs';
import path from 'path';


function mailer() {
  var transporter = nodemailer.createTransport('***REMOVED***:***REMOVED***@smtp.gmail.com');

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
    return fs.readFileSync(path.resolve('server/views/email/welcome.template.html'), 'utf8')
      .replace('{{username}}', username)
      .replace('{{mail}}', email)
      .replace('{{activationLink}}', activationLink);
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
      console.log('Server is ready to take our messages');
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
