  var request = require('supertest');
var expect = require('chai').expect;
var express = require('express');

var app = require('../../server/app.js');
var User = require('../../server/users/userModel.js');
var Trip = require('../../server/trips/tripModel.js');

describe('Server Tests', function() {

  afterEach(function(done) {
    // delete objects from db so they can be created for tests
    User.remove({ username: 'testuser' }).exec();
    Trip.remove({ name: 'Bizzare Adventure'}).exec();
    Trip.remove({ name: 'Random'}).exec();
    done();
  });

  describe('Account creation: ', function() {

    it('Sign up creates a new user', function(done) {
      request(app)
        .post('/users/signup')
        .send({
          'username': 'testuser',
          'password': 'testpw'
        })
        .expect(201)
        .expect(function(res) {
          expect(res.body.token).to.be.ok;

          User.findOne({ username: 'testuser' })
            .exec(function(error, user) {
              expect(user.username).to.equal('testuser');
            });
        })
        .end(done);
    });

  });  // Account creation

  describe('Account login: ', function() {

    beforeEach(function(done) {
      request(app)
        .post('/users/signup')
        .send({
          'username': 'testuser',
          'password': 'testpw' })
        .end(done);
    });

    it('Signs in an existing user', function(done) {
      request(app)
        .post('/users/signin')
        .send({
          'username': 'testuser',
          'password': 'testpw'
        })
        .expect(200)
        .expect(function(res) {
          expect(res.body.token).to.be.ok;
        })
        .end(done);
    });

    it('Respond to incorrect password with 403', function(done) {
      request(app)
      .post('/users/signin')
      .send({
        'username': 'testuser',
        'password': 'badpw'
      })
      .expect(403)
      .expect(function(res) {
        expect(res.body.token).to.not.be.ok;
      })
      .end(done);
    });

    it('Respond to username that does not exist with 404', function(done) {
      request(app)
        .post('/users/signin')
        .send({
          'username': 'testuser2',
          'password': 'testpw'
        })
        .expect(404)
        .expect(function(res) {
          expect(res.body.token).to.not.be.ok;
        })
        .end(done);
    });

  }); // Account login

  describe('Trip creation: ', function() {

    beforeEach(function(done) {
      request(app)
        .post('/users/signup')
        .send({
          'username': 'testuser',
          'password': 'testpw' })
        .end(done);
    });

    it('Creates a trip', function(done) {
      User.findOne({'username': 'testuser'}, function(err, user){
        request(app)
          .post('/trips/')
          .send({
            'id': user._id,
            'name': 'Bizzare Adventure',
            'code': 'JoJo'
          })
          .expect(201)
          .expect(function(res) {
            expect(res.body.name).to.equal('Bizzare Adventure');
          })
          .end(done);
      })
    });

    it('Join a trip', function(done) {
      User.findOne({'username':'testuser'}, function(err, user){
        Trip.create({
          creator: user._id,
          participants: [user._id],
          name: 'Random',
          code: 'Random',
          expenses: []
        }, function(err, trip){
          request(app)
            .post('/trips/join')
            .send({
              id: user._id,
              code: 'Random'
            })
            .expect(200)
            .expect(function(result){
              expect(result.body.participants.length).to.equal(2);
            })
            .end(done);
        });
      });
    });

    it('Get current trip', function(done) {
      User.findOne({'username':'testuser'}, function(err, user){
        Trip.create({
          creator: user._id,
          participants: [user._id],
          name: 'Random',
          code: 'Random',
          expenses: []
        }, function(err, trip){
        
        user.currentTrip = trip._id;
        user.save(function(){
          request(app)
          .get('/trips/' + user._id)
          .expect(200)
          .expect(function(res) {
            expect(res.body.name).to.equal('Random');
          })
          .end(done);
          });
        })
      })
    });

    it('Adds expense', function(done) {
      User.findOne({'username':'testuser'}, function(err, user){
        Trip.create({
          creator: user._id,
          participants: [user._id],
          name: 'Random',
          code: 'Random',
          expenses: []
        }, function(err, trip){
        
        user.currentTrip = trip._id;
        user.save(function(err, user){
            request(app)
              .post('/trips/expense')
              .send({
                id: user._id,
                name: 'beer',
                amount: 100,
                stakeholders: [user._id]
              })
              .expect(201)
              .expect(function(res) {
                expect(res.body.name).to.equal('Random');
              })
              .end(done);
          });
        })
      })
  });
});
});