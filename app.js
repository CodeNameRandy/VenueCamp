//Used for Google Maps
require('dotenv').config();

var express            = require("express"),
    app                = express(),
    bodyParser         = require("body-parser"),
    mongoose           = require("mongoose"),
    passport           = require("passport"),
    LocalStrategy      = require("passport-local"),
    methodOverride     = require("method-override"),
    flash              = require("connect-flash"),
    Campground         = require("./models/campground"),
    Comment            = require("./models/comment"),
    User               = require("./models/user");
    // seedDB             = require("./seeds"); //same directory as app.js so need the ./
//Require Route files    
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    indexRoutes         = require("./routes/index");
    
mongoose.connect("mongodb+srv://codenamerandy:1Jackson!@cluster0-3mqic.mongodb.net/yelp_camp?retryWrites=true");
app.use(bodyParser.urlencoded({extended: true}));


//use method override
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
//connect app to stylesheet "Main"
    //Serve Everything in the Public Directory
        //dirname = the directory that the script lives in - safer
            //Continue on header file
app.use(express.static(__dirname + "/public"));
//Seed the database
//seedDB();
//connect flash
app.use(flash());

//Passport Configuration
//========================================

app.use(require("express-session")({
    secret: "Kona is a big ol brat",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //User.authenticate comes from passportLocalMongoose
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//middleware that runs for every single route
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    //first route in flash
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    //need next! or nothing else will run
    next();
});
//Tells app to use 3 routes that we have required above
app.use("/", indexRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log("VenueCamp Server has started...");
})