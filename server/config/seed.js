/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import Thing from '../api/thing/thing.model';
import User from '../api/user/user.model';
import Project from '../api/project/project.model';

Thing.find({}).remove()
  .then(() => {
    Thing.create({
      name: 'Development Tools',
      info: 'Integration with popular tools such as Webpack, Gulp, Babel, TypeScript, Karma, ' +
        'Mocha, ESLint, Node Inspector, Livereload, Protractor, Pug, ' +
        'Stylus, Sass, and Less.'
    }, {
      name: 'Server and Client integration',
      info: 'Built with a powerful and fun stack: MongoDB, Express, ' +
        'AngularJS, and Node.'
    }, {
      name: 'Smart Build System',
      info: 'Build system ignores `spec` files, allowing you to keep ' +
        'tests alongside code. Automatic injection of scripts and ' +
        'styles into your index.html'
    }, {
      name: 'Modular Structure',
      info: 'Best practice client and server structures allow for more ' +
        'code reusability and maximum scalability'
    }, {
      name: 'Optimized Build',
      info: 'Build process packs up your templates as a single JavaScript ' +
        'payload, minifies your scripts/css/images, and rewrites asset ' +
        'names for caching.'
    }, {
      name: 'Deployment Ready',
      info: 'Easily deploy your app to Heroku or Openshift with the heroku ' +
        'and openshift subgenerators'
    });
  });

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

        let userId;
        User.find({ 'email': 'test@example.com' }).select('_id').exec((err, value) => {
          userId = value;
        });


        Project.find({}).remove()
          .then(() => {
            Project.create({
                "test_suites": [
                  { "test_cases": [{ "test_steps": [{ "testCaseId": 1, "expectedResult": "username visible", "action": "Type username to username field of an admin", "id": 1 }, { "testCaseId": 1, "expectedResult": "Password filled, not visible (*)", "action": "type password to password field", "id": 2 }, { "testCaseId": 1, "expectedResult": "Site logs in to workspace, Projects button on menu is visible", "action": "Click submit button", "id": 3 }, { "testCaseId": 1, "expectedResult": "", "action": "", "id": 4 }], "title": "Login with admin", "test_suite_id": 1, "id": 1 }, { "test_steps": [{ "testCaseId": 2, "expectedResult": "username visible", "action": "Type username to username field of an admin", "id": 1 }, { "testCaseId": 2, "expectedResult": "Password filled, not visible (*)", "action": "type password to password field", "id": 2 }, { "testCaseId": 2, "expectedResult": "Site logs in to workspace, Projects button on menu is NOT visible", "action": "Click submit button", "id": 3 }, { "testCaseId": 2, "expectedResult": "", "action": "", "id": 4 }], "title": "Login with normal user", "test_suite_id": 1, "id": 2 }], "test_suites": [], "nodes": [], "title": "Login", "id": 1 }, { "test_suites": [], "nodes": [], "title": "Workspace", "id": 2 }
                ],
                "name": "Testcaser",
                "description": "",
                "owner_user": userId[0]._id
              })
              .then(() => {
                console.log('finished populating projects');
              });
          });

      });
  });