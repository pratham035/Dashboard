var express              = require("express");
var router               = express.Router({mergeParams: true});
var Campground           = require("../models/campground");
var Comment              = require("../models/comment");

//++++++++++++++++++++++++++++++++++++++++++++++++++++Comments
router.get("/campgrounds/:id/comments/new", isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
       if(err){
         console.log(err);
       }else{
         res.render("comments/new",{campground : campground});
       }
     })
   });
  
  //post the new comments
  router.post("/campgrounds/:id/comments",isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function(err, campground){
      console.log("ID "+req.params.id);
      if(err){
        console.log(err);
        res.redirect("/campgrounds");
      }else{
        Comment.create(req.body.comment, function(err,comment){
          if(err){
            console.log(err);
          }else{
            //add user name and id to comments
            comment.author.username = req.user.username;
            comment.author.id = req.user._id;
            //save comment
            comment.save();
            campground.comments.push(comment);
            campground.save();
            res.redirect('/campgrounds/' + campground._id);
            console.log("Created new comment");
          }
        })
      }
    })
  });

  function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
  };

  module.exports = router;