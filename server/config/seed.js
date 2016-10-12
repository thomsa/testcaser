/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Project from '../api/project/project.model';


User.find({}).remove()
  .then(() => {
    User.create({
        provider: 'local',
        name: 'Test User',
        email: 'test@example.com',
        password: 'test'
      }, {
        provider: 'local',
        role: 'admin',
        name: 'Admin',
        email: 'admin@example.com',
        password: 'admin'
      })
      .then(() => {
        console.log('finished populating users');

        User.find({ 'email': 'test@example.com' }).select('_id').exec((err, value) => {
          Project.find({}).remove()
            .then(() => {
              Project.create({
                  'test_suites': [
                    { 'test_cases': [{ 'test_steps': [{ 'testCaseId': 1, 'expectedResult': 'username visible', 'action': 'Type username to username field of an admin', 'id': 1 }, { 'testCaseId': 1, 'expectedResult': 'Password filled, not visible (*)', 'action': 'type password to password field', 'id': 2 }, { 'testCaseId': 1, 'expectedResult': 'Site logs in to workspace, Projects button on menu is visible', 'action': 'Click submit button', 'id': 3 }, { 'testCaseId': 1, 'expectedResult': '', 'action': '', 'id': 4 }], 'title': 'Login with admin', 'test_suite_id': 1, 'id': 1 }, { 'test_steps': [{ 'testCaseId': 2, 'expectedResult': 'username visible', 'action': 'Type username to username field of an admin', 'id': 1 }, { 'testCaseId': 2, 'expectedResult': 'Password filled, not visible (*)', 'action': 'type password to password field', 'id': 2 }, { 'testCaseId': 2, 'expectedResult': 'Site logs in to workspace, Projects button on menu is NOT visible', 'action': 'Click submit button', 'id': 3 }, { 'testCaseId': 2, 'expectedResult': '', 'action': '', 'id': 4 }], 'title': 'Login with normal user', 'test_suite_id': 1, 'id': 2 }], 'test_suites': [], 'nodes': [], 'title': 'Login', 'id': 1 }, { 'test_suites': [], 'nodes': [], 'title': 'Workspace', 'id': 2 }
                  ],
                  'name': 'Testcaser',
                  'description': '',
                  'owner_user': value[0]._id
                })
                .then(() => {
                  console.log('finished populating projects');
                });
            });
        });
      });
  });
