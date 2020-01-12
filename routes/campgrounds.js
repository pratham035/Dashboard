var express = require("express");
var router  = express.Router();
var Campground = require("../models/campground");

router.get("/campgrounds", function(req,res){
    Campground.find({}, function(err,allCampgrounds){
      if(err){
        console.log(err)
      }else{
        res.render("campgrounds/index",{campgrounds:allCampgrounds});
      }
    })    
  });
  
  //Post the Campground name and Image to collection Campgrounds(Create Route)
  router.post("/campgrounds",function(req, res){
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
  router.get("/campgrounds/:id/edit", function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
      if(err){
        res.redirect("/campgrounds")
      }else{
        res.render("edit",{campground : foundCamp});
      }
    })
  });
  
  // //put request(Put Route)
  router.put("/campgrounds/:id/", function(req, res){
     Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err, updatedCamp){
      if(err){
              res.redirect("/campgrounds");
            }else{
              res.redirect("/campgrounds/" +req.params.id);
            }
    })
  });

  //Delete Route(Delete Campground)
  router.delete("/campgrounds/:id", function (req, res) {
    Campground.findByIdAndRemove(req.params.id, function (err) {
      if (err) {
        res.redirect("/campgrounds");
      } else {
        res.redirect("/campgrounds");
      }
    })
  });

  module.exports = router;
  