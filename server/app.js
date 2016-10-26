/**
 * Main application file
 */

'use strict';
import express from 'express';

//security measures
import helmet from 'helmet';
import hpp from 'hpp';
import eclv from 'express-content-length-validator';

import mongoose from 'mongoose';
mongoose.Promise = require('bluebird');
import config from './config/environment';
import http from 'http';


import './shared/extensions';

// Connect to MongoDB
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});

// Populate databases with sample data
if(config.seedDB) {
  require('./config/seed');
}

// Setup server
var app = express();

//security measures
app.use(helmet());
app.use(hpp());
var MAX_CONTENT_LENGTH_ACCEPTED = 9999;
app.use(eclv.validateMax({ max: MAX_CONTENT_LENGTH_ACCEPTED, status: 400, message: 'Invalid payload; too big.' })); // max size accepted for the content-length


var server = http.createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio').default(socketio);
require('./config/express').default(app);
require('./routes').default(app);

// Start server
function startServer() {
  app.angularFullstack = server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
