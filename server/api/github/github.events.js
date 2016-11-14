/**
 * Github model events
 */

'use strict';

import {EventEmitter} from 'events';
import Github from './github.model';
var GithubEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
GithubEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  Github.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    GithubEvents.emit(event + ':' + doc._id, doc);
    GithubEvents.emit(event, doc);
  };
}

export default GithubEvents;
