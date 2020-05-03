var mongoose = require('mongoose');
module.exports = function(app) {
    var car = require('../controllers/carController.js');
    app.route('/cars')
        .get(car.cars)
        .post(car.add);
    app.route('/cars/:carId')
        .get(car.getcar)
        .post(car.book)
        .put(car.update)
        .delete(car.delete);
};