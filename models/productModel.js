var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema({
  product_name: { type: String, Required:  true },
  price:    { type: String,     Required:  true},
  category: { type: String ,    Required:  true}
});
module.exports = mongoose.model('articles', productSchema);