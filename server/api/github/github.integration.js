'use strict';

var app = require('../..');
import request from 'supertest';

var newGithub;

describe('Github API:', function() {
  describe('GET /api/github', function() {
    var githubs;

    beforeEach(function(done) {
      request(app)
        .get('/api/github')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          githubs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      githubs.should.be.instanceOf(Array);
    });
  });

  describe('POST /api/github', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/github')
        .send({
          name: 'New Github',
          info: 'This is the brand new github!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newGithub = res.body;
          done();
        });
    });

    it('should respond with the newly created github', function() {
      newGithub.name.should.equal('New Github');
      newGithub.info.should.equal('This is the brand new github!!!');
    });
  });

  describe('GET /api/github/:id', function() {
    var github;

    beforeEach(function(done) {
      request(app)
        .get(`/api/github/${newGithub._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          github = res.body;
          done();
        });
    });

    afterEach(function() {
      github = {};
    });

    it('should respond with the requested github', function() {
      github.name.should.equal('New Github');
      github.info.should.equal('This is the brand new github!!!');
    });
  });

  describe('PUT /api/github/:id', function() {
    var updatedGithub;

    beforeEach(function(done) {
      request(app)
        .put(`/api/github/${newGithub._id}`)
        .send({
          name: 'Updated Github',
          info: 'This is the updated github!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedGithub = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedGithub = {};
    });

    it('should respond with the original github', function() {
      updatedGithub.name.should.equal('New Github');
      updatedGithub.info.should.equal('This is the brand new github!!!');
    });

    it('should respond with the updated github on a subsequent GET', function(done) {
      request(app)
        .get(`/api/github/${newGithub._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let github = res.body;

          github.name.should.equal('Updated Github');
          github.info.should.equal('This is the updated github!!!');

          done();
        });
    });
  });

  describe('PATCH /api/github/:id', function() {
    var patchedGithub;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/github/${newGithub._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Github' },
          { op: 'replace', path: '/info', value: 'This is the patched github!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedGithub = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedGithub = {};
    });

    it('should respond with the patched github', function() {
      patchedGithub.name.should.equal('Patched Github');
      patchedGithub.info.should.equal('This is the patched github!!!');
    });
  });

  describe('DELETE /api/github/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/github/${newGithub._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when github does not exist', function(done) {
      request(app)
        .delete(`/api/github/${newGithub._id}`)
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
