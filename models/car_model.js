var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
  vehicle_number: { type: String, Required:  true },
  model:    { type: String,     Required:  true},
  seating_capacity:    { type: String,     Required:  true},
  rent_per_day: { type: String ,    Required:  true},
  bookings:[]
});
module.exports = mongoose.model('cars', productSchema);