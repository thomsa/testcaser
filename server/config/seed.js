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

        User.find({ email: 'test@example.com' }).select('_id').exec((err, value) => {
          Project.find({}).remove()
            .then(() => {
              Project.create({
                testSuites: [{
                  testCases: [{
                    testSteps: [
                          { testCaseId: 1, expectedResult: 'username visible', action: 'Type username to username field of an admin', id: 1 },
                          { testCaseId: 1, expectedResult: 'Password filled, not visible (*)', action: 'type password to password field', id: 2 },
                          { testCaseId: 1, expectedResult: 'Site logs in to workspace, Projects button on menu is visible', action: 'Click submit button', id: 3 },

                    ],
                    title: 'Login with admin',
                    testSuiteId: 1,
                    id: 1
                  },
                  {
                    testSteps: [{ testCaseId: 2, expectedResult: 'username visible', action: 'Type username to username field of an admin', id: 1 },
                          { testCaseId: 2, expectedResult: 'Password filled, not visible (*)', action: 'type password to password field', id: 2 },
                          { testCaseId: 2, expectedResult: 'Site logs in to workspace, Projects button on menu is NOT visible', action: 'Click submit button', id: 3 },

                        ],
                    title: 'Login with normal user',
                    testSuiteId: 1,
                    id: 2
                  }
                    ],

                  nodes: [],
                  title: 'Login',
                  id: 1
                }, { nodes: [], title: 'Workspace', id: 2 }],
                name: 'Testcaser',
                description: '',
                ownerUser: value[0]._id
              })
                .then(() => {
                  console.log('finished populating projects');
                });
            });
        });
      });
  });
