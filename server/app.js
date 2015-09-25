var express = require('express');
var mongoose = require('mongoose');

var app = express();

var fs = require('fs');
var https = require('https');
var privateKey = fs.readFileSync('server.key');
var certificate = fs.readFileSync('server.cert');

var credentials = {key: privateKey, cert: certificate};

mongoose.connect('mongodb://localhost/test');

// routing handled in middleware
require('./config/middleware.js')(app, express);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(8443);
console.log('Listening to port 8443...');

module.exports = app;
