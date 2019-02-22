//Express Router
var express = require("express");
//extra syntax needed in order to access the :id defined in app.js shortened syntax
var router = express.Router({mergeParams: true});
//require correct models
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware");

// COMMENTS ROUTES
    //runs isLoggedIn first to check if user is logged in, then calls next function = allows rendering of comments form

router.get("/new", middleware.isLoggedIn, function(req, res){
        //find campground by id
        Campground.findById(req.params.id, function(err, campground){
            if(err){
                console.log(err);
                
            } else {
                //send through to render on page
       res.render("comments/new", {campground: campground});
            }
        });
        
    
});

//COMMENTS POST ROUTE

router.post("/", middleware.isLoggedIn, function(req, res){
    //Lookup campground using ID
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong");
                    console.log(err);
                } else {
                    //add username and id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                  
                    //save comment
                    comment.save();
                    //connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    console.log(comment);
                    //redirect to campground show page
                    req.flash("success", "You successfully added a comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
            
            
        }
    });
    
    
});

//Edit Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            res.redirect("back");
        } else {
                                        //where campground_id is defined
                                        //id is defined in app.js app.use(/campgrounds/:id/comments...)
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
    
});

//Update Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error", "No Campground Found");
            return res.redirect("back");
        }
    //req.params.comment_id comes from the put route above
    //req.bod.comment comes from the form action
    //have to actually look up the comment because we need the actual text inside of it
            Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
                if(err){
                    res.redirect("back");
                } else {
                    res.redirect("/campgrounds/" + req.params.id);
                }
            });
        });
    });
  

//Destroy Comment Route

    //Campground Destroy ROute: /campgrounds/:id
    //Comment Destroy Route:    /campgrounds/:id/comments/:comment_id as a DELETE Request
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "comment deleted");
            //send to show page              req.params.id is id for campgrounds
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});    

//isLoggedIn middleware


//Comment Auth Middleware


module.exports = router;
