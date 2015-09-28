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
});