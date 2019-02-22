var mongoose = require("mongoose");

//add passport local plugin

var passportLocalMongoose = require("passport-local-mongoose");

//Set Up Schema
var UserSchema = new mongoose.Schema({
    username: String,
    password: String

});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);