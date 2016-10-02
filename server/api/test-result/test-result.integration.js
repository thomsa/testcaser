'use strict';

var app = require('../..');
import request from 'supertest';

var newTestResult;

describe('TestResult API:', function() {
  describe('GET /api/test-results', function() {
    var testResults;

    beforeEach(function(done) {
      request(app)
        .get('/api/test-results')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          testResults = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      testResults.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/test-results', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/test-results')
        .send({
          name: 'New TestResult',
          info: 'This is the brand new testResult!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newTestResult = res.body;
          done();
        });
    });

    it('should respond with the newly created testResult', function() {
      newTestResult.name.should.equal('New TestResult');
      newTestResult.info.should.equal('This is the brand new testResult!!!');
    });
  });

  describe('GET /api/test-results/:id', function() {
    var testResult;

    beforeEach(function(done) {
      request(app)
        .get(`/api/test-results/${newTestResult._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          testResult = res.body;
          done();
        });
    });

    afterEach(function() {
      testResult = {};
    });

    it('should respond with the requested testResult', function() {
      testResult.name.should.equal('New TestResult');
      testResult.info.should.equal('This is the brand new testResult!!!');
    });
  });

  describe('PUT /api/test-results/:id', function() {
    var updatedTestResult;

    beforeEach(function(done) {
      request(app)
        .put(`/api/test-results/${newTestResult._id}`)
        .send({
          name: 'Updated TestResult',
          info: 'This is the updated testResult!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedTestResult = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTestResult = {};
    });

    it('should respond with the original testResult', function() {
      updatedTestResult.name.should.equal('New TestResult');
      updatedTestResult.info.should.equal('This is the brand new testResult!!!');
    });

    it('should respond with the updated testResult on a subsequent GET', function(done) {
      request(app)
        .get(`/api/test-results/${newTestResult._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let testResult = res.body;

          testResult.name.should.equal('Updated TestResult');
          testResult.info.should.equal('This is the updated testResult!!!');

          done();
        });
    });
  });

  describe('PATCH /api/test-results/:id', function() {
    var patchedTestResult;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/test-results/${newTestResult._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched TestResult' },
          { op: 'replace', path: '/info', value: 'This is the patched testResult!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedTestResult = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedTestResult = {};
    });

    it('should respond with the patched testResult', function() {
      patchedTestResult.name.should.equal('Patched TestResult');
      patchedTestResult.info.should.equal('This is the patched testResult!!!');
    });
  });

  describe('DELETE /api/test-results/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/test-results/${newTestResult._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when testResult does not exist', function(done) {
      request(app)
        .delete(`/api/test-results/${newTestResult._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
