var Campground = require("../models/campground");
var Comment = require("../models/comment");
//all the middleware goes here
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
      if(req.isAuthenticated()){
         Campground.findById(req.params.id, function(err, foundCampground){
            if(err || !foundCampground){
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else{
                
                //does user own the campground?
                    //new syntax because author.id !=== req.user._id due to string vs mongoose object(foundCampground.author) syntax
                if(foundCampground.author.id.equals(req.user._id)){
                 next();
                } else {
                    req.flash("error", "You don't have permission to do that");
                    //new syntax**
                   res.redirect("back");
                }
                 
            }
    });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }

    
};

middlewareObj.checkCommentOwnership = function(req, res, next){
      if(req.isAuthenticated()){
         
          Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err || !foundComment){
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else{
                //flash
                req.flash("error", "Comment not found");
                //does user own the comment?
                    //new syntax because author.id !=== req.user._id due to string vs mongoose object(foundCampground.author) syntax
                if(foundComment.author.id.equals(req.user._id)){
                 next();
                } else {
                    //flash
                    req.flash("error", "You don't have permission to do that");
                    //new syntax**
                   res.redirect("back");
                }
                 
            }
    });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    } 
    //does not actually render anything, need to display the flash still
        //req.flash needs to come first!
        
    req.flash("error", "You need to be logged in to do that!");
    res.redirect("/login");
};



module.exports = middlewareObj;