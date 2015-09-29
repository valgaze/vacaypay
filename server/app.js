var express = require('express');
var mongoose = require('mongoose');
var favicon = require('serve-favicon');

var app = express();

var fs = require('fs');
var https = require('https');
var privateKey = fs.readFileSync(__dirname + '/server.key');
var certificate = fs.readFileSync(__dirname + '/server.cert');

var credentials = {key: privateKey, cert: certificate};

mongoose.connect('mongodb://localhost/test');

// routing handled in middleware
require('./config/middleware.js')(app, express);

// serve favicon
app.use(favicon(__dirname + '/../client/assets/favicon.ico'));

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);
console.log('Listening to port 8443...');

module.exports = app;
