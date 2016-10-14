/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/projects              ->  index
 * POST    /api/projects              ->  create
 * GET     /api/projects/:id          ->  show
 * PUT     /api/projects/:id          ->  upsert
 * PATCH   /api/projects/:id          ->  patch
 * DELETE  /api/projects/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Project from './project.model';
import TestResult from '../test-result/test-result.model';

import events from './project.events';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Projects
export function index(req, res) {
  return Project.find().where('ownerUser').equals(req.user.id).exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Project from the DB
export function show(req, res) {
  return Project.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Project in the DB
export function create(req, res) {
  req.body.ownerUser = req.user._id;
  return Project.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Project in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }

  return Project.findOneAndUpdate({ '_id': req.params.id }, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true, new: true }).exec()
    .then(doc => {
      return new Promise(
        (resolve, reject) => {
          events.emit('save', doc);
          resolve(doc);
        });
    })
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Updates an existing Project in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Project.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Project from the DB
export function destroy(req, res) {
  return Project.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}


export function testResultsAnalysis(req, res) {
  var result = [];

  TestResult.find({ projectId: req.params.id }).exec((error, value) => {
    value.forEach(function(element) {
      var allSuccess = 0;
      var allFailed = 0;
      element.results.forEach(function(result) {
        if(result.isTestOk) {
          allSuccess++;
        } else {
          allFailed++;
        }
      }, this);

      var existingElem = result.find(elem => {
        return elem.testSuiteId === element.testSuiteId;
      });

      if(existingElem) {
        existingElem.successRatio += allSuccess;
        existingElem.failureRatio += allFailed;
      } else {
        var thisResult = {};
        thisResult.testSuiteId = element.testSuiteId;
        thisResult.successRatio = allSuccess;
        thisResult.failureRatio = allFailed;

        result.push(thisResult);
      }
    }, this);
  })
    .then(() => {
      return res.status(200).json(result);
    })
    .catch(handleError(res));
}
