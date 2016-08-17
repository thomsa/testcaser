'use strict';

import mongoose from 'mongoose';

var ProjectSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean,
  description: String,
  creationDate : { type: Date, default: Date.now },
  modifiedDate:{ type: Date, default: Date.now },

});

export default mongoose.model('Project', ProjectSchema);
