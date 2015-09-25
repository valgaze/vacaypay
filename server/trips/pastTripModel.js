// Todo Implement and export schema using mongoose
// Reference angular sprint
var mongoose = require('mongoose');
//var User = require('../users/UserModel.js');

var Schema = mongoose.Schema;

var PastTripSchema = new Schema({
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
	],
	summary: [{
		payer: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		payee: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		},
		amount: Number
	}]
});

module.exports = mongoose.model('pasttrips', PastTripSchema);