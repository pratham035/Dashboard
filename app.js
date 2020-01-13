var express             = require('express');
var bodyParser          = require('body-parser');
var app                 = express();
var mongoose            = require('mongoose');
var seedDB              = require("./views/seeds");
var methodOverride      = require("method-override");
var passport            = require("passport");
var LocalStrategy       = require("passport-local");
var User                = require("./models/user");
var url                 = 'mongodb://localhost/BootCamp';         
const port              = 3000;
//requring routes
var commentRoutes     = require("./routes/comments");
var campgroundRoutes  = require("./routes/campgrounds");
var indexRoutes       = require("./routes/index");


app.use(bodyParser.urlencoded({extended:  true}));
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(methodOverride("_method"));

// seedDB();

//passport
app.use(require("express-session")({
  secret    : "Prashanth",
  resave    : false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// send logged in user details to every routes:
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

//Root Node(Base URL)
app.get("/", function(req,res){
  res.render("landing");
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

app.use(commentRoutes);
app.use(indexRoutes);  
app.use(campgroundRoutes);

//Listens to port 3000 and keeps server running
app.listen(port, () => console.log(`Express app listening on port ${port}!`));