var userController = require('./userController.js');

module.exports = function (app) {

  app.get('signup', userController.signup);
  app.get('signin', userController.signin);

};
