'use strict';

import express from 'express';
import passport from 'passport';
import { signToken } from '../auth.service';

var router = express.Router();

router.post('/', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if(error) {
      return res.status(401).json(error);
    }
    if(!user) {
      return res.status(404).json({ message: 'Something went wrong, please try again.' });
    }
    // if user has activationToken it is not activated yet, so don't let it in.
    if(user.activationToken) {
      return res.status(401).json({ message: 'User is not activated! Please activate first through the email.' });
    }

    var token = signToken(user._id, user.role);
    res.json({ token });
  })(req, res, next);
});

export default router;
