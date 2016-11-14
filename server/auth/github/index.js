'use strict';

import express from 'express';
import passport from 'passport';
import { setTokenCookie, isAuthenticated } from '../auth.service';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../../api/user/user.model';
import config from '../../config/environment';

var router = express.Router();


var isStrategySetup = false;

var passportSetupGitStrategy = function() {
  return function(req, res, next) {
    if(!isStrategySetup) {
      passport.use('github-connect', new GitHubStrategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL + '/from-connect',
      },
        function(accessToken, refreshToken, profile, done) {
          User.findOne({ _id: req.user._id }).exec()
            .then(user => {
              if(user) {
                profile._json.accessToken = accessToken;
                user.github = profile._json;
                user.save()
                  .then(savedUser => done(null, savedUser))
                  .catch(err => done(err));
              }
            })
            .catch(err => done(err));
        }), function(error, user) {
          console.log('were at the right playe');
        });
    }
    isStrategySetup = true;
    next();
  };
};

function returnToSettings() {
  return function(req, res, next) {
    //***REDIRECT TO AUTO CLOSING WINDOW:
    res.redirect('/3CQR7J38a6AZHV2N');
  };
}

router
  .get('/', passport.authenticate('github', {
    scope: ['user', 'gist', 'user:email', 'repo'],
    failureRedirect: '/signup',
    session: false
  }))
  .get('/callback', passport.authenticate('github', {
    failureRedirect: '/signup',
    session: false
  }), setTokenCookie)

  .get('/callback/from-connect',
    isAuthenticated(),
    passport.authenticate('github-connect', {
      session: false,
      failureRedirect: '/settings',
    }),
    returnToSettings())

  .get('/connect',
    isAuthenticated(),
    passportSetupGitStrategy(),
    passport.authenticate('github-connect', {
      scope: ['user', 'gist', 'user:email', 'repo'],
      failureRedirect: '/signup',
      session: false
    }));


export default router;
