var User = require('../../server/users/userModel.js');
var Trip = require('./tripModel.js');
var PastTrip = require('./pastTripModel.js');

module.exports = {
	// TODO:
	// Look up the database to find requested users current trip.
	getCurrentTrip: function(req, res){
		var id = req.body;
		User.findById(id, function(err, tripinfo){
			Trip.findById(tripinfo.currentTrip, function(err, currenttrip){
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
		Trip.create({
			creator: id,
			participants: [id],
			name: tripName,
			code: code,
			expenses: []
		}, function(err, trip){
			if(err) {
				console.log('code is already taken');
				res.status(422).end();
			}
			res.status(201).send(trip).end();
		});
	},

	// Add user to the participant list of designated trip
	joinTrip: function(req, res){
		var data = req.body;
		var id = data.id;
		var code = data.code;

		Trip.update({code:code}, {$push: id}, function(err, trip){
			if(err){
				console.log('Such code does not exist');
				res.status(404).end();
			}
			console.log('result check: ', trip);
			res.status(200).send(trip).end();
		});
	},

	// Add expense to the trip
	addExpense: function(req, res){
		var data = req.body;
		var id = data.id;

		Trip.find({participants: id}, function(err, trip){
			if(err) {
				console.log('Trip with given user as participant not found');
				res.status(404).end();
			}

			var newExpense = {
				name: data.name,
				amount: data.amount,
				payer: trip.payer,
				stakeholders: data.stakeholders
			}

			Trip.update({_id: trip._id}, {$push: newExpense}, function(err, trip){
				res.status(201).send(trip).end();
			})
		})
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