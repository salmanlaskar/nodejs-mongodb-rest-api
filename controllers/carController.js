var mongoose = require('mongoose'),
Car = mongoose.model('cars'),
Booking = mongoose.model('bookings');
var db=mongoose.connection;

exports.cars = function(req, res) {
  var s=new Date(req.query.start),e=new Date(req.query.end),seat=(req.query.seat);
  if(!seat)seat=0;
  Car.find({seating_capacity:{$gte:seat}},function(err,cars){
    if(!s||!e){
      res.json(cars);
      return;
    }
    
    var filtered_car=[];
    cars.map((car)=>{
      var flag=true;
      car.bookings.map((book)=>{
        if(s<=book.return_date&&e>=book.issue_date){
          flag=false;
        }
      });
      if(flag){
        filtered_car.push(car);
      }
    });
    res.json(filtered_car);
  });
};
exports.getcar = function(req,res){
  var id = mongoose.Types.ObjectId(req.params.carId);
  Car.find({_id:id},function(err,car){
    if (err)
      res.send(err);
    res.json(car);
  });
};
exports.add = function(req, res) {
  var new_car = new Car(req.body);
  new_car.save(function(err, car) {
    if (err)
      res.send(err);
    res.json(car);
  });
};
function  update_seat(id,req,res){
  Car.findById(id,(err,car)=>{
    if(err){
      res.send(err);
    }
    else{
      car.seating_capacity=req.query.seat;
      Car.findOneAndUpdate({_id: id}, car, {new: true}, function(err, car1) {
        if (err)
          res.send(err);
        res.json(car1);
      });
    }
  });
};
function  update_rent(id,req,res){
  Car.findById(id,(err,car)=>{
    if(err){
      res.send(err);
    }
    else{
      car.rent_per_day=req.query.rent;
      Car.findOneAndUpdate({_id: id}, car, {new: true}, function(err, car1) {
        if (err)
          res.send(err);
        res.json(car1);
      });
    }
  });
};
exports.update = function(req, res) {
  var id = mongoose.Types.ObjectId(req.query.carId),
  seat=req.query.seat, rent=req.query.rent;
  if(seat){
    update_seat(id,req,res);
  }
  if(rent){
    update_rent(id,req,res);
  }
  if(!seat&&!rent){
    res.json({message:"updated parameter must be passed"});
  }
};
exports.delete = function(req, res) {
  var id = mongoose.Types.ObjectId(req.query.carId);
  var date=new Date;
  //date=date.toString();
  console.log(date);
  var flag=true;
  Car.findById(id,(err,car)=>{
    if(err){
      console.log(err);
      return false;
    }
    else{
      for(book of car.bookings){
          var d1=new Date(book.return_date);
          //d1=d1.toString();
          console.log(d1);
          if(d1>date){
            flag=false;
          }
          //console.log(book.return_date);
      }
      console.log(flag);
      if(flag){
        Car.deleteOne({
            _id: id
          }, function(err, car) {
            if (err)
              res.send(err);
            res.json({ message: 'Product successfully deleted' });
          });
      }
      else{res.json({ message: 'Product can\'t deleted' });}
    }
  });
};
exports.book = function(req, res) {
    var id = mongoose.Types.ObjectId(req.query.carId);
    var new_booking=new Booking(req.body);
    var start_date=new Date(req.query.start);
    //start_date=start_date.toString();
    var end_date=new Date(req.query.end);
    //end_date=end_date.toString();
  //console.log(date);
  var flag=true;
  Car.findById(id,(err,car)=>{
    if(err){
      console.log(err);
      return false;
    }
    else{
      for(book of car.bookings){
          var d1=new Date(book.issue_date);
          //console.log(d1);
          var d2=new Date(book.return_date);  
          let len =   d1.length;
          //d1=Date.parse(d1.toString());d2=Date.parse(d2.toString());
          //console.log(d1," ",d2," ",start_date," ",end_date);
          if(start_date<=d2&&end_date>=d1){
            flag=false;
          }
          //console.log(book.return_date);
      }
      console.log(flag);
      if(flag){
        new_booking.save(function(err, book) {
          if (err)
            res.send(err);
          else{
              Car.findById(id,function(err,car){
                  if(err)
                      res.send(err);
                  else{
                      car.bookings.push(book);
                      console.log(car.bookings);
                      car.save();
                      res.json(book);
                  }
              });
          }
        });
      }
      else{
        res.json({message:"can't book"});
      }
    }
  });
};