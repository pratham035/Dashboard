var createError         = require('http-errors');
var express             = require('express');
var path                = require('path');
var cookieParser        = require('cookie-parser');
var logger              = require('morgan');
var indexRouter         = require('./routes/index');
var usersRouter         = require('./routes/users');
var bodyParser          = require('body-parser');
var app                 = express();
var mongoose            = require('mongoose');
var url                 = 'mongodb://localhost/BootCamp';         
const port              = 3000;

app.use(bodyParser.urlencoded({extended:  true}));
app.set("view engine", "ejs");

//SCHEMA SETUP and MODEL(By Using Mongoose)
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String
});
const Campground = mongoose.model("Campground",campgroundSchema);

//Root Node(Base URL)
app.get("/", function(req,res){
  res.render("landing");
});

//Get all Campgrounds listed in Database(Index Route)
app.get("/campgrounds", function(req,res){
  Campground.find({}, function(err,allCampgrounds){
    if(err){
      console.log(err)
    }else{
      res.render("index",{campgrounds:allCampgrounds});
    }
  })    
});

//Post the Campground name and Image to collection Campgrounds(Create Route)
app.post("/campgrounds",function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var newCamp = {name: name, image: image,description:desc}
  Campground.create(newCamp,function(err,newlyCreated){
    if(err){
      console.log(err);
    }else{
      res.redirect("/campgrounds");
    }
  })
});

//Redirects the app to upload new image (new ROute)
app.get("/campgounds/new", function(req,res){
  res.render("new.ejs");
  
});

//Connects to DB by using mongoose
mongoose.connect(url, {
	useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

//Show Route(to show more details)
app.get("/campgrounds/:id", function(req,res){
  Campground.findById(req.params.id, function(err, foundCamp){
    if(err){
      console.log(err);
    }else{
      res.render("show",{campground : foundCamp});
    }
  })
  
})
//Listens to port 3000 and keeps server running
app.listen(port, () => console.log(`Express app listening on port ${port}!`));