var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

router.get("/campgrounds", isLoggedIn , function(req,res){
    Campground.find({}, function(err,allCampgrounds){
      if(err){
        console.log(err)
      }else{
        res.render("campgrounds/index",{campgrounds:allCampgrounds});
      }
    })    
  });
  
  //Post the Campground name and Image to collection Campgrounds(Create Route)
  router.post("/campgrounds", isLoggedIn, function(req, res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
      id: req.user._id,
      username: req.user.username
    }
    var newCamp = {name: name, image: image,description:desc,author:author}
    Campground.create(newCamp,function(err,newlyCreated){
      if(err){
        console.log(err);
      }else{
        res.redirect("/campgrounds");
      }
    })
  });

  //Redirects the app to upload new image (new ROute)
  router.get("/campgounds/new", function(req,res){
    res.render("campgrounds/new");  
  });

  //Show Route(to show more details)
  router.get("/campgrounds/:id", function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
      if(err){
        console.log(err);
      }else{
        res.render("campgrounds/show",{campground : foundCamp});
      }
    })  
  });
  
  //edit the campground(Edit Route)
  router.get("/campgrounds/:id/edit", checkCampgroundOwnership,function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});
  
  // //put request(Put Route)
  router.put("/campgrounds/:id/",checkCampgroundOwnership, function(req, res){
    // find and update the correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
           //redirect somewhere(show page)
           res.redirect("/campgrounds/" + req.params.id);
       }
    });
});

  //Delete Route(Delete Campground)
  router.delete("/campgrounds/:id",checkCampgroundOwnership, function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds");
      }
    })
  });

  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
  };

  function checkCampgroundOwnership(req, res, next) {
    if(req.isAuthenticated()){
          Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                res.redirect("back");
            }  else {
                // does user own the campground?
              if(foundCampground.author.id.equals(req.user._id)) {
                  next();
              } else {
                  res.redirect("back");
              }
            }
          });
      } else {
          res.redirect("back");
      }
}

  module.exports = router;
  