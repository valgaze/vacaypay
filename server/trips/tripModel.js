// Todo Implement and export schema using mongoose
// Reference angular sprint
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Q = require('q');
var SALT_WORK_FACTOR = 10;

var Schema = mongoose.Schema;


var TripSchema = new Schema({
	code: {
		type: String,
		required: true,
		unique: true
	},
	expenses: {
		type: String,
		required: true
	}
});

