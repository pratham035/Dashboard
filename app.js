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
var Campground          = require("./models/campgrounds")
var methodOverride      = require("method-override");
var url                 = 'mongodb://localhost/BootCamp';         
const port              = 3000;

app.use(bodyParser.urlencoded({extended:  true}));
app.set("view engine", "ejs");
app.use(express.static("./public"));
app.use(methodOverride("_method"));

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
      res.render("campgrounds/index",{campgrounds:allCampgrounds});
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
  res.render("campgrounds/new");
  
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
      res.render("campgrounds/show",{campground : foundCamp});
    }
  })  
});

//edit the campground(Edit Route)
app.get("/campgrounds/:id/edit", function(req, res){
  Campground.findById(req.params.id, function(err, foundCamp){
    if(err){
      res.redirect("/campgrounds")
    }else{
      res.render("edit",{campground : foundCamp});
    }
  })
});

// //put request(Put Route)
app.put("/campgrounds/:id/", function(req, res){
  Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err, updatedCamp){
    if(err){
            res.redirect("/campgrounds");
          }else{
            res.redirect("/campgrounds/" +req.params.id);
          }
  })
});

//Delete Route(Delete Campground)
app.delete("/campgrounds/:id", function (req, res) {
  Campground.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      res.redirect("/campgrounds");
    } else {
      res.redirect("/campgrounds");
    }
  })
})
//++++++++++++++++++++++++++++++++++++++++++++++++++++Comments
//Get the New Comment Form
app.get("/campgrounds/:id/comments/new", function(req,res){
 Campground.findById(req.params.id, function(err, campground){
    if(err){
      console.log(err);
    }else{
      res.render("comments/new",{campground : campground});
    }
  })
});

//post the new comments
app.post("/campgrounds/:id/comments",function(req, res){
  Campground.findById(req.params.id, function(err, campground){
    console.log("ID "+req.params.id);
    if(err){
      console.log(err);
      res.redirect("/campgrounds");
    }else{
      Campground.create(req.body.comment, function(err,comment){
        if(err){
          console.log(err);
        }else{
          console.log("Comments Added");
          // campground.comments.push(comments);
          // campground.save();
          // res.redirect('/campgrounds/' + campground._id);
        }
      })
    }
  })
});
//Listens to port 3000 and keeps server running
app.listen(port, () => console.log(`Express app listening on port ${port}!`));