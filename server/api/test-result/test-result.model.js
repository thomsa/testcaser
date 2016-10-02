'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var TestResultSchema = new mongoose.Schema({
    user: {},
    projectId: Schema.ObjectId,
    testSuiteId: Number,
    results: [{
        isTestOk: Boolean,
        testCaseId: Number,
        testStepId: Number
    }],
}, { timestamps: { createdAt: 'created_at' } });

export default mongoose.model('TestResult', TestResultSchema);