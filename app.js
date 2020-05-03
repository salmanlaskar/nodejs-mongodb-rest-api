require('dotenv').config();
var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  Car = require('./models/car_model'),
  Booking =require('./models/booking_model'),
  bodyParser = require('body-parser');
//mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost/Car',{ useNewUrlParser: true ,useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./routes/carRoutes');
routes(app);
app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(port);
console.log('RESTful web services with Nodejs started on port: ' + port);