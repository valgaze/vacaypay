var request = require('supertest');
var expect = require('chai').expect;
var express = require('express');

var app = require('../../server/app.js');
var User = require('../../server/users/userModel.js');

describe('MongoTests', function() {

  beforeEach(function(done) {
    var newUser = {
      username: 'test',
      password: '1234'
    };

    User.create({ username: 'test' }, function(error) {
      if (error) {
        console.log('Error creating user: ', error);
      }
      done();
    });
  });

  afterEach(function(done) {
    User.remove({ username: 'test' }, function(error) {
      if (error) {
        console.log('Error removing user: ', error);
      }
      done();
    });
  });

  describe('User creation:', function() {
    


  });

});
