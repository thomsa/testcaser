'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var TestSuite = {
  testCases: [{
    testSteps: [{
      testCaseId: Number,
      expectedResult: String,
      action: String,
      id: Number,
    }],
    title: String,
    testSuiteId: Number,
    id: Number,
    cummulatedExpectedResult: String
  }],
  title: String,
  id: Number,
  nodes: []
};

var ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  active: Boolean,
  assignedUsers: [Schema.ObjectId],
  ownerUser: String,
  testSuites: [TestSuite]
});

export default mongoose.model('Project', ProjectSchema);
