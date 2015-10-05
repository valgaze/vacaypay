// Todo Implement and export schema using mongoose
// Reference angular sprint
var mongoose = require('mongoose');
//var User = require('../users/UserModel.js');

var Schema = mongoose.Schema;

var PastTripSchema = new Schema({
	creator: {
		id:{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}, 
		username: {type: String}
	},
	participants: [{
		id:{
			type: Schema.Types.ObjectId,
			ref: 'User'
		}, 
		username: {type: String}
	}],
	name: {
		type: String,
		required: true
	},
	code: {
		type: String,
		required: true
	},
	expenses: [
		{
			name: String,
			amount: Number,
			payer: {
				id:{
					type: Schema.Types.ObjectId,
					ref: 'User'
				}, 
				username: {type: String}
			},
			stakeholders: [{
				id:{
					type: Schema.Types.ObjectId,
					ref: 'User'
				}, 
				username: {type: String}
			}],
		}
	],
	summary: [{
		username: {
			type: String
		},
		payee: {}
	}]
});

module.exports = mongoose.model('pasttrips', PastTripSchema);