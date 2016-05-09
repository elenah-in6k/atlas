// 'use strict';
//
// var should = require('should'),
//   request = require('supertest'),
//   path = require('path'),
//   mongoose = require('mongoose'),
//   User = mongoose.model('User'),
//   Body = mongoose.model('Body'),
//   express = require(path.resolve('./config/lib/express'));
//
// /**
//  * Globals
//  */
// var app, agent, credentials, user, body;
//
// /**
//  * Body routes tests
//  */
// describe('Body CRUD tests', function () {
//
//   before(function (done) {
//     // Get application
//     app = express.init(mongoose);
//     agent = request.agent(app);
//
//     done();
//   });
//
//   beforeEach(function (done) {
//     // Create user credentials
//     credentials = {
//       username: 'username',
//       password: 'M3@n.jsI$Aw3$0m3'
//     };
//
//     // Create a new user
//     user = new User({
//       firstName: 'Full',
//       lastName: 'Name',
//       displayName: 'Full Name',
//       email: 'test@test.com',
//       username: credentials.username,
//       password: credentials.password,
//       provider: 'local'
//     });
//
//     // Save a user to the test db and create new Body
//     user.save(function () {
//       body = {
//         name: 'Body name'
//       };
//
//       done();
//     });
//   });
//
//   it('should be able to save a Body if logged in', function (done) {
//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }
//
//         // Get the userId
//         var userId = user.id;
//
//         // Save a new Body
//         agent.post('/api/bodies')
//           .send(body)
//           .expect(200)
//           .end(function (bodySaveErr, bodySaveRes) {
//             // Handle Body save error
//             if (bodySaveErr) {
//               return done(bodySaveErr);
//             }
//
//             // Get a list of Bodies
//             agent.get('/api/bodies')
//               .end(function (bodysGetErr, bodysGetRes) {
//                 // Handle Body save error
//                 if (bodysGetErr) {
//                   return done(bodysGetErr);
//                 }
//
//                 // Get Bodies list
//                 //var bodies = bodiesGetRes.body;
//
//                 // Set assertions
//                 (bodies[0].user._id).should.equal(userId);
//                 (bodies[0].name).should.match('Body name');
//
//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });
//
//   it('should not be able to save an Body if not logged in', function (done) {
//     agent.post('/api/bodies')
//       .send(body)
//       .expect(403)
//       .end(function (bodySaveErr, bodySaveRes) {
//         // Call the assertion callback
//         done(bodySaveErr);
//       });
//   });
//
//   it('should not be able to save an Body if no name is provided', function (done) {
//     // Invalidate name field
//     body.name = '';
//
//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }
//
//         // Get the userId
//         var userId = user.id;
//
//         // Save a new Body
//         agent.post('/api/bodies')
//           .send(body)
//           .expect(400)
//           .end(function (bodySaveErr, bodySaveRes) {
//             // Set message assertion
//             (bodySaveRes.body.message).should.match('Please fill Body name');
//
//             // Handle Body save error
//             done(bodySaveErr);
//           });
//       });
//   });
//
//   it('should be able to update an Body if signed in', function (done) {
//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }
//
//         // Get the userId
//         var userId = user.id;
//
//         // Save a new Body
//         agent.post('/api/bodies')
//           .send(body)
//           .expect(200)
//           .end(function (bodySaveErr, bodySaveRes) {
//             // Handle Body save error
//             if (bodySaveErr) {
//               return done(bodySaveErr);
//             }
//
//             // Update Body name
//             body.name = 'WHY YOU GOTTA BE SO MEAN?';
//
//             // Update an existing Body
//             agent.put('/api/bodies/' + bodySaveRes.body._id)
//               .send(body)
//               .expect(200)
//               .end(function (bodyUpdateErr, bodyUpdateRes) {
//                 // Handle Body update error
//                 if (bodyUpdateErr) {
//                   return done(bodyUpdateErr);
//                 }
//
//                 // Set assertions
//                 (bodyUpdateRes.body._id).should.equal(bodySaveRes.body._id);
//                 (bodyUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');
//
//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });
//
//   it('should be able to get a list of Bodies if not signed in', function (done) {
//     // Create new Body model instance
//     var bodyObj = new Body(body);
//
//     // Save the body
//     bodyObj.save(function () {
//       // Request Bodies
//       request(app).get('/api/bodies')
//         .end(function (req, res) {
//           // Set assertion
//           res.body.should.be.instanceof(Array).and.have.lengthOf(1);
//
//           // Call the assertion callback
//           done();
//         });
//
//     });
//   });
//
//   it('should be able to get a single Body if not signed in', function (done) {
//     // Create new Body model instance
//     var bodyObj = new Body(body);
//
//     // Save the Body
//     bodyObj.save(function () {
//       request(app).get('/api/bodies/' + bodyObj._id)
//         .end(function (req, res) {
//           // Set assertion
//           res.body.should.be.instanceof(Object).and.have.property('name', body.name);
//
//           // Call the assertion callback
//           done();
//         });
//     });
//   });
//
//   it('should return proper error for single Body with an invalid Id, if not signed in', function (done) {
//     // test is not a valid mongoose Id
//     request(app).get('/api/bodies/test')
//       .end(function (req, res) {
//         // Set assertion
//         res.body.should.be.instanceof(Object).and.have.property('message', 'Body is invalid');
//
//         // Call the assertion callback
//         done();
//       });
//   });
//
//   it('should return proper error for single Body which doesnt exist, if not signed in', function (done) {
//     // This is a valid mongoose Id but a non-existent Body
//     request(app).get('/api/bodies/559e9cd815f80b4c256a8f41')
//       .end(function (req, res) {
//         // Set assertion
//         res.body.should.be.instanceof(Object).and.have.property('message', 'No Body with that identifier has been found');
//
//         // Call the assertion callback
//         done();
//       });
//   });
//
//   it('should be able to delete an Body if signed in', function (done) {
//     agent.post('/api/auth/signin')
//       .send(credentials)
//       .expect(200)
//       .end(function (signinErr, signinRes) {
//         // Handle signin error
//         if (signinErr) {
//           return done(signinErr);
//         }
//
//         // Get the userId
//         var userId = user.id;
//
//         // Save a new Body
//         agent.post('/api/bodies')
//           .send(body)
//           .expect(200)
//           .end(function (bodySaveErr, bodySaveRes) {
//             // Handle Body save error
//             if (bodySaveErr) {
//               return done(bodySaveErr);
//             }
//
//             // Delete an existing Body
//             agent.delete('/api/bodies/' + bodySaveRes.body._id)
//               .send(body)
//               .expect(200)
//               .end(function (bodyDeleteErr, bodyDeleteRes) {
//                 // Handle body error error
//                 if (bodyDeleteErr) {
//                   return done(bodyDeleteErr);
//                 }
//
//                 // Set assertions
//                 (bodyDeleteRes.body._id).should.equal(bodySaveRes.body._id);
//
//                 // Call the assertion callback
//                 done();
//               });
//           });
//       });
//   });
//
//   it('should not be able to delete an Body if not signed in', function (done) {
//     // Set Body user
//     body.user = user;
//
//     // Create new Body model instance
//     var bodyObj = new Body(body);
//
//     // Save the Body
//     bodyObj.save(function () {
//       // Try deleting Body
//       request(app).delete('/api/bodies/' + bodyObj._id)
//         .expect(403)
//         .end(function (bodyDeleteErr, bodyDeleteRes) {
//           // Set message assertion
//           (bodyDeleteRes.body.message).should.match('User is not authorized');
//
//           // Handle Body error error
//           done(bodyDeleteErr);
//         });
//
//     });
//   });
//
//   it('should be able to get a single Body that has an orphaned user reference', function (done) {
//     // Create orphan user creds
//     var _creds = {
//       username: 'orphan',
//       password: 'M3@n.jsI$Aw3$0m3'
//     };
//
//     // Create orphan user
//     var _orphan = new User({
//       firstName: 'Full',
//       lastName: 'Name',
//       displayName: 'Full Name',
//       email: 'orphan@test.com',
//       username: _creds.username,
//       password: _creds.password,
//       provider: 'local'
//     });
//
//     _orphan.save(function (err, orphan) {
//       // Handle save error
//       if (err) {
//         return done(err);
//       }
//
//       agent.post('/api/auth/signin')
//         .send(_creds)
//         .expect(200)
//         .end(function (signinErr, signinRes) {
//           // Handle signin error
//           if (signinErr) {
//             return done(signinErr);
//           }
//
//           // Get the userId
//           var orphanId = orphan._id;
//
//           // Save a new Body
//           agent.post('/api/bodies')
//             .send(body)
//             .expect(200)
//             .end(function (bodySaveErr, bodySaveRes) {
//               // Handle Body save error
//               if (bodySaveErr) {
//                 return done(bodySaveErr);
//               }
//
//               // Set assertions on new Body
//               (bodySaveRes.body.name).should.equal(body.name);
//               should.exist(bodySaveRes.body.user);
//               should.equal(bodySaveRes.body.user._id, orphanId);
//
//               // force the Body to have an orphaned user reference
//               orphan.remove(function () {
//                 // now signin with valid user
//                 agent.post('/api/auth/signin')
//                   .send(credentials)
//                   .expect(200)
//                   .end(function (err, res) {
//                     // Handle signin error
//                     if (err) {
//                       return done(err);
//                     }
//
//                     // Get the Body
//                     agent.get('/api/bodies/' + bodySaveRes.body._id)
//                       .expect(200)
//                       .end(function (bodyInfoErr, bodyInfoRes) {
//                         // Handle Body error
//                         if (bodyInfoErr) {
//                           return done(bodyInfoErr);
//                         }
//
//                         // Set assertions
//                         (bodyInfoRes.body._id).should.equal(bodySaveRes.body._id);
//                         (bodyInfoRes.body.name).should.equal(body.name);
//                         should.equal(bodyInfoRes.body.user, undefined);
//
//                         // Call the assertion callback
//                         done();
//                       });
//                   });
//               });
//             });
//         });
//     });
//   });
//
//   afterEach(function (done) {
//     User.remove().exec(function () {
//       Body.remove().exec(done);
//     });
//   });
// });
