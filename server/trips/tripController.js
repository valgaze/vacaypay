var User = require('../../server/users/userModel.js');
var Trip = require('./tripModel.js');
var PastTrip = require('./pastTripModel.js');

module.exports = {
	// TODO:
	// Look up the database to find requested users current trip.
	getCurrentTrip: function(req, res){
		var id = req.query.id;
		User.findById(id, function(err, user){
			Trip.findById(user.currentTrip, function(err, currenttrip){
				res.status(200).send(currenttrip).end();
			})
		})
	},

	// Create a new trip under the user
	createTrip: function(req, res){
		var data = req.body;
		var id = data.id;
		var tripName = data.name;
		var code = data.code;
		User.findById(id, function(err, user){
			if(err) {
				console.log('User not found');
				res.status(404).end();
			}
			Trip.create({
				creator: {id: user._id, username: user.username},
				participants: [{id: user._id, username: user.username}],
				name: tripName,
				code: code,
				expenses: []
			}, function(err, newTrip){
				if(err) {
					console.log('code is already taken');
					res.status(422).end();
				}
				user.currentTrip = newTrip._id;
				user.save( function (err, result) {
					res.status(201).send(newTrip).end();
				});
			});
		})
	},

	// Add user to the participant list of designated trip
	joinTrip: function(req, res){
		var data = req.body;
		var id = data.id;
		var code = data.code;

		Trip.findOne({code:code}, function(err, trip){
			if(err){
				console.log('Such code does not exist');
				res.status(404).end('Such code does not exist');
			}

			User.findById(id, function(err, user){
				if(err){
					console.log('couldn\'t find user for some reason');
				}
				user.currentTrip = trip._id;
				trip.participants.push({id: user._id, username: user.username});
				trip.save(function(err, tripresult){
					if (err) {
						console.log('Problem updating trip');
						res.status(500).send(trip).end();
					}
					user.save(function(err, userresult){
						res.status(200).send(tripresult).end();
					})
				});
			});
		});
	},

	// Add expense to the trip
	addExpense: function(req, res){
		var data = req.body;
		var id = data.id;
		var name = data.name;
		var amount = data.amount;
		var stakeholders = data.stakeholders;

		User.findById(id, function(err, user){
			Trip.findById(user.currentTrip, function(err, trip){
				if(err) {
					console.log('Trip with given user as participant not found');
					res.status(404).end();
				}

				var newExpense = {
					name: name,
					amount: amount,
					payer: {id: user._id, username: user.username},
					stakeholders: stakeholders
				}

				trip.expenses.push(newExpense);

				trip.save(function(err, trip){
					if(err) console.log('Error saving trip');
					res.status(201).send(trip).end();
				});
			});
		});
	},

	// Replicate current trip to old trip and then delete current trip 
	endTrip: function(req, res){

	},

	// Get the most recent finished trip of requested user
	getRecent: function(req, res){
		var data = req.body;
		var id = data.id;
		PastTrip.find({participants: id},{},{sort: {'_id':-1}}, function(err, trip){
			if(err){
				console.log('Trip with user as participant not found');
				res.status(500).end();
			}
			res.status(200).send(trip).end();
		})
	}
}