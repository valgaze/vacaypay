// Todo Implement and export schema using mongoose
// Reference angular sprint
var mongoose = require('mongoose');
//var User = require('../users/UserModel.js');

var Schema = mongoose.Schema;

var TripSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	code: {
		type: String,
		required: true,
		unique: true
	},
	expenses: [
		{
			name: String,
			amount: Number,
			payer: {
				type: Schema.Types.ObjectId,
				ref: 'User'
			},
			stakeholder: [{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}],
		}
	]
});

module.exports = mongoose.model('trips', TripSchema);