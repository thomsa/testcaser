'use strict';

import User from './user.model';
import passport from 'passport';
import config from '../../config/environment';
import jwt from 'jsonwebtoken';

import mailer from '../../components/mailer/mailer';
import crypto from 'crypto';

function validationError(res, statusCode) {
  statusCode = statusCode || 422;
  return function(err) {
    return res.status(statusCode).json(err);
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    return res.status(statusCode).send(err);
  };
}

/**
 * Get list of users
 * restriction: 'admin'
 */
export function index(req, res) {
  return User.find({}, '-salt -password').exec()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(handleError(res));
}

/**
 * Creates a new user
 */
export function create(req, res, next) {
  var newUser = new User(req.body);
  var hash = crypto.createHash('md5').update(Date.now().toString() + newUser.email).digest('hex');
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.activationToken = hash;
  newUser.save()
    .then(user => {
      console.log('Sending email to user');
      var emailTemplate = mailer.templates.welcome(req.body.name, req.body.email, `http://localhost:3000/account/activate?email=${req.body.email}&token=${hash}`);
      var mailData = {
        from: '"TestCaser" <no-reply@testcaser.com>',
        to: req.body.email,
        subject: 'Welcome to TestCaser',
        html: emailTemplate
      };

      mailer.sendMail(mailData);

      var token = jwt.sign({ _id: user._id }, config.secrets.session, {
        expiresIn: 60 * 60 * 5
      });
      res.json({ token });
    })
    .catch(validationError(res));
}

/**
 * Get a single user
 */
export function show(req, res, next) {
  var userId = req.params.id;

  return User.findById(userId).exec()
    .then(user => {
      if(!user) {
        return res.status(404).end();
      }
      res.json(user.profile);
    })
    .catch(err => next(err));
}

/**
 * Deletes a user
 * restriction: 'admin'
 */
export function destroy(req, res) {
  return User.findByIdAndRemove(req.params.id).exec()
    .then(function() {
      res.status(204).end();
    })
    .catch(handleError(res));
}

/**
 * Change a users password
 */
export function changePassword(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  return User.findById(userId).exec()
    .then(user => {
      if(user.authenticate(oldPass)) {
        user.password = newPass;
        return user.save()
          .then(() => {
            res.status(204).end();
          })
          .catch(validationError(res));
      } else {
        return res.status(403).end();
      }
    });
}

/**
 * Get my info
 */
export function me(req, res, next) {
  var userId = req.user._id;

  return User.findOne({ _id: userId }, '-salt -password').exec()
    .then(user => { // don't ever give out the password or salt
      if(!user) {
        return res.status(401).end();
      }
      res.json(user);
    })
    .catch(err => next(err));
}

/**
 * Authentication callback
 */
export function authCallback(req, res, next) {
  res.redirect('/');
}


export function activate(req, res, next) {
  var email = req.body.email;
  var token = req.body.token;
  User.find({ email }, '-salt -password').exec((error, users) => {
    if(error) {
      throw error;
    }
    var user = users[0];
    if(!user) {
      return res.status(404).json({ error: 'User not found' }).end();
    }
    if(!user.activationToken) {
      return res.status(400).json({ error: 'User has already been activated' }).end();
    }
    if(user.activationToken !== token) {
      return res.status(400).json({ error: 'Token is not valid' }).end();
    }
    user.activationToken = null;
    return user.save()
        .then(() => {
          res.status(200).end();
        });
  })
    .catch(err => next(err));
}
