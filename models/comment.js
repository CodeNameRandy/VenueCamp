var mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
    text: String,
    //comment form does not have to include author - auto populates
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
        
    }
});



module.exports = mongoose.model("Comment", commentSchema); 