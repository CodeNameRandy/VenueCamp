
//Express Router
var express = require("express");
var router = express.Router();
//require passport
var passport = require("passport");
//define user
var User = require("../models/user");

router.get('/', function(req, res){
    res.render("landing");
});

//******************************************************************************

//Auth Routes

//Show Register Form
router.get("/register", function(req, res){
    res.render("register"); //create register
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        //if problem signing up console log it then render register again
        if(err){
            console.log(err);
            return res.render("register", {error: err.message});
        } //logs user in then redirects them to content
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to VenueCamp" + " " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//Show login form
router.get("/login", function(req, res){
    
    //second route in flash
    res.render("login");
});

//handle login logic - use middleware
    //format = app.post("/login", middleware, callback)

router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/campgrounds",
        failureRedirect:"/login"
    }), function(req,res){
});

//Logout Logic
router.get("/logout", function(req, res){
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

//******************************************************************************

// show register form
router.get("/register", function(req, res){
   res.render("register", {page: 'register'}); 
});

//show login form
router.get("/login", function(req, res){
   res.render("login", {page: 'login'}); 
});

module.exports = router;