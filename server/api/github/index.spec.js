'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var githubCtrlStub = {
  index: 'githubCtrl.index',
  show: 'githubCtrl.show',
  create: 'githubCtrl.create',
  upsert: 'githubCtrl.upsert',
  patch: 'githubCtrl.patch',
  destroy: 'githubCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var githubIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './github.controller': githubCtrlStub
});

describe('Github API Router:', function() {
  it('should return an express router instance', function() {
    githubIndex.should.equal(routerStub);
  });

  describe('GET /api/github', function() {
    it('should route to github.controller.index', function() {
      routerStub.get
        .withArgs('/', 'githubCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/github/:id', function() {
    it('should route to github.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'githubCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/github', function() {
    it('should route to github.controller.create', function() {
      routerStub.post
        .withArgs('/', 'githubCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/github/:id', function() {
    it('should route to github.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'githubCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/github/:id', function() {
    it('should route to github.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'githubCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/github/:id', function() {
    it('should route to github.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'githubCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
