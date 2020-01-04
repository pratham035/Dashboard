var createError         = require('http-errors');
var express             = require('express');
var path                = require('path');
var cookieParser        = require('cookie-parser');
var logger              = require('morgan');
var indexRouter         = require('./routes/index');
var usersRouter         = require('./routes/users');
var app                 = express();
var mongoose            = require('mongoose');
var url                 = 'mongodb://localhost/BootCamp';         
const port              = 3000;

app.set("view engine", "ejs");

app.get("/", function(req,res){
  res.render("landing");
})

app.get("/campgrounds", function(req,res){
  var camp = [
    {name :"Image1", image :"https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72277bdd954bc55b_340.jpg"},
    {name :"Image2", image: "https://pixabay.com/get/57e1d14a4e52ae14f6da8c7dda793f7f1636dfe2564c704c72277bdd954bc55b_340.jpg"},
    {name :"image3", image: "https://pixabay.com/get/57e8d0424a5bae14f6da8c7dda793f7f1636dfe2564c704c72277bdd954bc55b_340.jpg" }
   ]
  res.render("campgrounds",{campgrounds:camp});
})


// mongoose.connect(url, {
// 	useNewUrlParser: true,
//   useCreateIndex: true,
//   useUnifiedTopology: true
// }).then(() => {
// 	console.log('Connected to DB!');
// }).catch(err => {
// 	console.log('ERROR:', err.message);
// });

// const PostSchema = new mongoose.Schema({
//   title: String,
//   description: String,
// });

// const Post = mongoose.model("Dashboard", PostSchema);

// app.get('/', async (req, res) => {
//  let post = await Post.create({title: 'Test', description: 'This is a test for Dashboard third instance'});
//  res.send(post);
// });

app.listen(port, () => console.log(`Express app listening on port ${port}!`));