/**
 * TestResult model events
 */

'use strict';

import { EventEmitter } from 'events';
import TestResult from './test-result.model';
var TestResultEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
TestResultEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
for(var e in events) {
  let event = events[e];
  TestResult.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    TestResultEvents.emit(event + ':' + doc._id, doc);
    TestResultEvents.emit(event, doc);
  };
}

export default TestResultEvents;
