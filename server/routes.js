/**
 * Main application routes
 */

'use strict';

import errors from './components/errors';
import path from 'path';

export default function(app) {
  // Insert routes below
  app.use('/api/github', require('./api/github'));
  app.use('/api/test-results', require('./api/test-result'));
  app.use('/api/projects', require('./api/project'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth').default);

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
    .get(errors[404]);


  //****THIS IS A SPECIAL ROUTE WHERE THE WINDOW AUTOCLOSES! USED FOR OAUTH CALLBACKS****
  app.route('/3CQR7J38a6AZHV2N').get(function(req, res) {
    res.render('close-window', {}, function(err, html) {
      if(err) {
        return res.status(500).json(err);
      }
      res.send(html);
    });
  });

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
}
