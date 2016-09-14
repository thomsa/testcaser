'use strict';

import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  // active: Boolean,
  // assigned_users: [Schema.ObjectId],
  owner_user: String,
  test_suites: {}
});

export default mongoose.model('Project', ProjectSchema);
