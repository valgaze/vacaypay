var expect = require('chai').expect;
var express = require('express');

var User = require('../../server/users/userModel.js');
var Trip = require('../../server/trips/tripModel.js');

describe('Mongo', function() {

  beforeEach(function(done) {
    var newUser = {
      username: 'test',
      password: '1234'
    };

    User.create(newUser, function(error, user) {
      if (error) {
        console.log('Error creating test user: ', error);
      }
  
      var newTrip = {
        creator: user._id,
        participants: [user._id],
        name: 'test trip',
        code: 'ABCD',
        expenses: {
          name: 'food',
          amount: 15.50,
          payer: user._id,
          stakeholders: [user._id]
        }
      };

      Trip.create(newTrip, function(error) {
        if (error) {
          console.log('Error creating trip: ', error);
        }
        done();
      });
    });

  });

  afterEach(function(done) {
    User.remove({ username: 'test' }, function(error) {
      if (error) {
        console.log('Error removing test user: ', error);
      }
  
      Trip.remove({ name: 'test trip' }, function(error) {
        if (error) {
          console.log('Error removing test trip: ', error);
        }
        done();
      });
    });

  });

  describe('Model creation:', function() {
    
    it('Should create a new user', function(done) {
      User.findOne({ username: 'test' })
        .exec(function(error, user) {
          if (error) {
            console.log('Cannot find user: ', error);
          }
          
          expect(user.username).to.equal('test');
          expect(user.password).to.not.equal('1234');
          done();
        });
    });

    it('Should successfully compare original password to hash', function(done) {
      User.findOne({ username: 'test' })
        .exec(function(error, user) {
          user.comparePasswords('1234')
            .then(function(result) {
              expect(result).to.be.true;
              done();
            });
        });
    });

    it('Should create a new trip', function(done) {
      Trip.findOne({ name: 'test trip' })
        .exec(function(error, trip) {
          if (error) {
            console.log('Cannot find trip: ', error);
          }

          expect(trip.code).to.equal('ABCD');
          expect(trip.expenses[0].name).to.equal('food');
          done();
        });
    });

  }); // model creation

});
