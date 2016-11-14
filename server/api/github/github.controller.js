/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/github              ->  index
 * POST    /api/github              ->  create
 * GET     /api/github/:id          ->  show
 * PUT     /api/github/:id          ->  upsert
 * PATCH   /api/github/:id          ->  patch
 * DELETE  /api/github/:id          ->  destroy
 */

'use strict';

var GitHubApi = require('github');


var github = new GitHubApi({
  // optional args
  debug: true,
  protocol: 'https',
  host: 'api.github.com', // should be api.github.com for GitHub
  //pathPrefix: '/api/v3', // for some GHEs; none for GitHub
  headers: {
    'user-agent': 'My-Cool-GitHub-App' // GitHub is happy with a unique user agent
  },
  Promise: require('bluebird'),
  followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
  timeout: 20000
});

// Gets a list of Githubs
export function index(req, res) {
  var accessToken = getGitHubToken(req.user);

  if(!accessToken) {
    return res.status(403).json({ message: 'No github integration is set for user.' });
  }

  github.authenticate({
    type: 'token',
    token: accessToken
  });

  github.issues.getAll({ filter: 'all', page: 1 }).then(data => {
    return res.status(200).json(data);
  }, error => {
    return res.status(error.cde).json(error);
  });
}

function getGitHubToken(user) {
  return user.github ? user.github.accessToken : null;
}
// Creates a new Github in the DB
export function create(req, res) {
  var accessToken = getGitHubToken(req.user);

  if(!accessToken) {
    return res.status(403).json({ message: 'No github integration is set for user.' });
  }

  github.authenticate({
    type: 'token',
    token: accessToken
  });

  github.issues.create({ owner: 'thomsa', repo: 'testcaser', title: 'From Testcaser api', body: 'yippy it works!' }).then(data => {
    return res.status(200).json(data);
  }, error => {
    return res.status(error.cde).json(error);
  });
}


import jsonpatch from 'fast-json-patch';
import Github from './github.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function (entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function (entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    res.status(statusCode).send(err);
  };
}


// Gets a single Github from the DB
export function show(req, res) {
  return Github.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}


// Upserts the given Github in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Github.findOneAndUpdate({ _id: req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

  .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Github in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Github.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Github from the DB
export function destroy(req, res) {
  return Github.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
