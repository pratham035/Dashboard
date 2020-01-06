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

var camp = [
  {name :"Image1", image :"https://cdn.pixabay.com/photo/2019/12/23/19/56/scotland-4715309__340.jpg"},
  {name :"Image2", image: "https://cdn.pixabay.com/photo/2019/12/06/14/01/sea-4677421__340.jpg"},
  {name :"image3", image: "https://cdn.pixabay.com/photo/2019/12/13/18/06/deer-4693574__340.jpg"}]

app.use(bodyParser.urlencoded({extended:  true}));
app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("landing");
})

app.get("/campgrounds", function(req,res){
    res.render("campgrounds",{campgrounds:camp});
})

app.post("/campgrounds",function(req, res){
  var name = req.body.name;
  var image = req.body.image;
  var newCamp = {name: name, image: image}
  camp.push(newCamp);
  res.redirect("/campgrounds");
})

app.get("/campgounds/new", function(req,res){
  res.render("new.ejs");
  
})

mongoose.connect(url, {
	useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
}).then(() => {
	console.log('Connected to DB!');
}).catch(err => {
	console.log('ERROR:', err.message);
});

const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
})

const Campground = mongoose.model("Campground",campgroundSchema);

Campground.create(
  {
    name: "Image1",
    image: "https://cdn.pixabay.com/photo/2019/12/13/18/06/deer-4693574__340.jpg"
  }, function(err,campground){
    if(err){
      console.log(err);
    }else{
      console.log("Newly created camp");
      console.log(campground)
      }
    });

// const PostSchema = new mongoose.Schema({
//   title: String,
//   description: String,
// });

// const Post = mongoose.model("Dashboard", PostSchema);

app.get('/', async (req, res) => {
 let post = await Post.create({title: 'Test', description: 'This is a test for Dashboard third instance'});
 res.send(post);
});

app.listen(port, () => console.log(`Express app listening on port ${port}!`));