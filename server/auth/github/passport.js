import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';

export function setup(User, config) {
  passport.use(new GitHubStrategy({
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL,
  },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ 'github.id': profile.id }).exec()
        .then(user => {
          if(user) {
            user.github.accessToken = refreshToken;
            return user.save()
              .then(savedUser => done(null, savedUser))
              .catch(err => done(err));
          }
          profile._json.accessToken = accessToken;
          user = new User({
            name: profile.displayName,
            email: profile.emails ? profile.emails[0].value : '',
            role: 'user',
            provider: 'github',
            github: profile._json
          });
          user.save()
            .then(savedUser => done(null, savedUser))
            .catch(err => done(err));
        })
        .catch(err => done(err));
    }));
}
