'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var testResultCtrlStub = {
  index: 'testResultCtrl.index',
  show: 'testResultCtrl.show',
  create: 'testResultCtrl.create',
  upsert: 'testResultCtrl.upsert',
  patch: 'testResultCtrl.patch',
  destroy: 'testResultCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var testResultIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './test-result.controller': testResultCtrlStub
});

describe('TestResult API Router:', function() {
  it('should return an express router instance', function() {
    testResultIndex.should.equal(routerStub);
  });

  describe('GET /api/test-results', function() {
    it('should route to testResult.controller.index', function() {
      routerStub.get
        .withArgs('/', 'testResultCtrl.index')
        .should.have.been.calledOnce;
    });
  });

  describe('GET /api/test-results/:id', function() {
    it('should route to testResult.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'testResultCtrl.show')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/test-results', function() {
    it('should route to testResult.controller.create', function() {
      routerStub.post
        .withArgs('/', 'testResultCtrl.create')
        .should.have.been.calledOnce;
    });
  });

  describe('PUT /api/test-results/:id', function() {
    it('should route to testResult.controller.upsert', function() {
      routerStub.put
        .withArgs('/:id', 'testResultCtrl.upsert')
        .should.have.been.calledOnce;
    });
  });

  describe('PATCH /api/test-results/:id', function() {
    it('should route to testResult.controller.patch', function() {
      routerStub.patch
        .withArgs('/:id', 'testResultCtrl.patch')
        .should.have.been.calledOnce;
    });
  });

  describe('DELETE /api/test-results/:id', function() {
    it('should route to testResult.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'testResultCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });
});
