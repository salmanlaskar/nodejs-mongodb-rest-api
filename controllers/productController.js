var mongoose = require('mongoose'),
Product = mongoose.model('articles');
exports.products = function(req, res) {
  Product.find({}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};
exports.getproduct = function(req,res){
  var id = mongoose.Types.ObjectId(req.query.productId);
  Product.find({_id:id},function(err,product){
    if (err)
      res.send(err);
    res.json(product);
  });
};
exports.add = function(req, res) {
  var new_product = new Product(req.body);
  new_product.save(function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};
exports.update = function(req, res) {
  var id = mongoose.Types.ObjectId(req.query.productId);
  Product.findOneAndUpdate({_id: id}, req.body, {new: true}, function(err, product) {
    if (err)
      res.send(err);
    res.json(product);
  });
};
exports.delete = function(req, res) {
  var id = mongoose.Types.ObjectId(req.query.productId);
  Product.deleteOne({
    _id: id
  }, function(err, product) {
    if (err)
      res.send(err);
    res.json({ message: 'Product successfully deleted' });
  });
};