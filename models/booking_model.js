var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bookingSchema = new Schema({
  customer_name: { type: String, Required:  true },
  phone_number: {type:Number,   required:   true},
  issue_date:    { type: Date,     Required:  true},
  return_date: { type: Date,    Required:  true}
});
module.exports = mongoose.model('bookings', bookingSchema);