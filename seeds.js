var mongoose = require("mongoose");
var Campground = require("./models/campground");

var Comment = require("./models/comment");

var data = [
    {
        name: "Oracle Arena", 
        image:"https://images.unsplash.com/photo-1511373051158-11c3e88dde72?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Bacon ipsum dolor amet cupim sirloin pork pork belly leberkas brisket. Ham jerky kielbasa strip steak beef frankfurter venison, pork belly meatloaf meatball pork chop. Kielbasa chuck tongue ground round, t-bone pastrami short ribs. Biltong salami fatback ground round."     
    },
    {
        name: "Warfield", 
        image:"https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
        description: "Bacon ipsum dolor amet cupim sirloin pork pork belly leberkas brisket. Ham jerky kielbasa strip steak beef frankfurter venison, pork belly meatloaf meatball pork chop. Kielbasa chuck tongue ground round, t-bone pastrami short ribs. Biltong salami fatback ground round."     
    },
    {
        name: "Bill Graham", 
        image:"https://images.unsplash.com/photo-1536081905080-f14fb4d6e52d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=815&q=80",
        description: "Bacon ipsum dolor amet cupim sirloin pork pork belly leberkas brisket. Ham jerky kielbasa strip steak beef frankfurter venison, pork belly meatloaf meatball pork chop. Kielbasa chuck tongue ground round, t-bone pastrami short ribs. Biltong salami fatback ground round."     
    }
    ];

function seedDB(){
    //Remove all campgrounds
    Campground.deleteMany({}, function(err){
    if(err){
        console.log(err);
    }
    console.log("removed campgrounds!");
      //add a few campgrounds (loop through each set of data and make a campground)
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if (err){
                console.log(err);
            } else {
                console.log("added a campground");
                 //add a few comments
                 Comment.create(
                     {
                        text: "This place is great, but I wish there was internet",
                        author: "Randy"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            //comments doesnt exist as of yet... need to add into campgroundSchema in campground.js
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment");
                        }
                    });   
                    
                }    
            
        });
    });
  
    });
}


module.exports = seedDB;
