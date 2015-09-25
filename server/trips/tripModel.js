// Todo Implement and export schema using mongoose
// Reference angular sprint
var mongoose = require('mongoose');
//var User = require('../users/UserModel.js');

var Schema = mongoose.Schema;

var TripSchema = new Schema({
	creator: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	participants: [{
		type: Schema.Types.ObjectId,
		ref: 'User'
	}],
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
			stakeholders: [{
				type: Schema.Types.ObjectId,
				ref: 'User'
			}],
		}
	]
});

module.exports = mongoose.model('trips', TripSchema);