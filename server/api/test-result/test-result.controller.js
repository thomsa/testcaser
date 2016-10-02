/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/test-results              ->  index
 * POST    /api/test-results              ->  create
 * GET     /api/test-results/:id          ->  show
 * PUT     /api/test-results/:id          ->  upsert
 * PATCH   /api/test-results/:id          ->  patch
 * DELETE  /api/test-results/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import TestResult from './test-result.model';

function respondWithResult(res, statusCode) {
    statusCode = statusCode || 200;
    return function(entity) {
        if (entity) {
            return res.status(statusCode).json(entity);
        }
        return null;
    };
}

function patchUpdates(patches) {
    return function(entity) {
        try {
            jsonpatch.apply(entity, patches, /*validate*/ true);
        } catch (err) {
            return Promise.reject(err);
        }

        return entity.save();
    };
}

function removeEntity(res) {
    return function(entity) {
        if (entity) {
            return entity.remove()
                .then(() => {
                    res.status(204).end();
                });
        }
    };
}

function handleEntityNotFound(res) {
    return function(entity) {
        if (!entity) {
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

// Gets a list of TestResults
export function index(req, res) {
    return TestResult.find().exec()
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Gets a single TestResult from the DB
export function show(req, res) {
    return TestResult.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Creates a new TestResult in the DB
export function create(req, res) {
    req.body.user = { _id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role };
    return TestResult.create(req.body)
        .then(respondWithResult(res, 201))
        .catch(handleError(res));
}

// Upserts the given TestResult in the DB at the specified ID
export function upsert(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return TestResult.findOneAndUpdate(req.params.id, req.body, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()

    .then(respondWithResult(res))
        .catch(handleError(res));
}

// Updates an existing TestResult in the DB
export function patch(req, res) {
    if (req.body._id) {
        delete req.body._id;
    }
    return TestResult.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(patchUpdates(req.body))
        .then(respondWithResult(res))
        .catch(handleError(res));
}

// Deletes a TestResult from the DB
export function destroy(req, res) {
    return TestResult.findById(req.params.id).exec()
        .then(handleEntityNotFound(res))
        .then(removeEntity(res))
        .catch(handleError(res));
}