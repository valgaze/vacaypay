var tripController = require('./tripController.js');

module.exports = function (app) {

	app.get('/', tripController.getCurrentTrip);
	app.post('/', tripController.createTrip);
	app.post('/join', tripController.joinTrip);
	app.post('/expense', tripController.addExpense);
	app.post('/end', tripController.endTrip);
	app.get('/recent', tripController.getRecent);

};
