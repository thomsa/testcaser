'use strict';

import mongoose from 'mongoose';

var GithubSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Github', GithubSchema);
