var express = require('express');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/test');

// routing handled in middleware
require('./config/middleware.js')(app, express);

app.listen(3000);
console.log('Listening to port 3000...');

module.exports = app;
