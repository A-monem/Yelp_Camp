var Campground = require("./models/campground");
var Comment = require("./models/comment");

// var data = [
    
//     {
//         name: "Salmon Creek",
//         image: "https://cdn.pixabay.com/photo/2016/02/18/22/16/tent-1208201_960_720.jpg",
//         description: "This is a huge campground. It is beautiful and fun. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris purus nisi, efficitur id magna sodales, euismod ullamcorper erat. Vivamus vel aliquam risus. Phasellus posuere tellus aliquet, pulvinar justo facilisis, condimentum ipsum. Suspendisse congue interdum est, ac varius magna vehicula nec. Donec egestas, dolor eget bibendum aliquet, tellus risus rhoncus lectus, at auctor sem turpis sit amet lectus. Vestibulum pharetra blandit ipsum, non pharetra ipsum ullamcorper ut. Morbi varius ligula vel hendrerit feugiat. Vivamus elementum, leo in efficitur laoreet, massa nisi accumsan erat, eget mattis ipsum lectus non odio. Pellentesque at augue condimentum, aliquet odio ac, malesuada tortor. Nunc iaculis ligula vitae porta congue. In ornare in quam et sollicitudin. Aliquam erat volutpat. Nullam eu vulputate libero."
//     }, 
//     {
//         name: "Granite Hills",
//         image: "https://cdn.pixabay.com/photo/2016/01/19/16/48/teepee-1149402_960_720.jpg",
//         description: "This is a massive granite hill. It is beautiful and fun. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris purus nisi, efficitur id magna sodales, euismod ullamcorper erat. Vivamus vel aliquam risus. Phasellus posuere tellus aliquet, pulvinar justo facilisis, condimentum ipsum. Suspendisse congue interdum est, ac varius magna vehicula nec. Donec egestas, dolor eget bibendum aliquet, tellus risus rhoncus lectus, at auctor sem turpis sit amet lectus. Vestibulum pharetra blandit ipsum, non pharetra ipsum ullamcorper ut. Morbi varius ligula vel hendrerit feugiat. Vivamus elementum, leo in efficitur laoreet, massa nisi accumsan erat, eget mattis ipsum lectus non odio. Pellentesque at augue condimentum, aliquet odio ac, malesuada tortor. Nunc iaculis ligula vitae porta congue. In ornare in quam et sollicitudin. Aliquam erat volutpat. Nullam eu vulputate libero."
//     },
//     {
//         name: "Mount Annan",
//         image: "http://theoaksatsacredrocks.com/wp-content/uploads/2016/07/camping-1031360_960_720.jpg",
//         description: "A beautiful camp on Annan mountain. Join us!! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris purus nisi, efficitur id magna sodales, euismod ullamcorper erat. Vivamus vel aliquam risus. Phasellus posuere tellus aliquet, pulvinar justo facilisis, condimentum ipsum. Suspendisse congue interdum est, ac varius magna vehicula nec. Donec egestas, dolor eget bibendum aliquet, tellus risus rhoncus lectus, at auctor sem turpis sit amet lectus. Vestibulum pharetra blandit ipsum, non pharetra ipsum ullamcorper ut. Morbi varius ligula vel hendrerit feugiat. Vivamus elementum, leo in efficitur laoreet, massa nisi accumsan erat, eget mattis ipsum lectus non odio. Pellentesque at augue condimentum, aliquet odio ac, malesuada tortor. Nunc iaculis ligula vitae porta congue. In ornare in quam et sollicitudin. Aliquam erat volutpat. Nullam eu vulputate libero."
//     },
//      {
//         name: "Trees",
//         image: "https://www.nationalparks.nsw.gov.au/-/media/npws/images/parks/myall-lakes-national-park/priority-2/white-tree-bay-campground/phase-3/white-tree-bay-campground-hero.jpg",
//         description: "Campground with trees and nice views Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris purus nisi, efficitur id magna sodales, euismod ullamcorper erat. Vivamus vel aliquam risus. Phasellus posuere tellus aliquet, pulvinar justo facilisis, condimentum ipsum. Suspendisse congue interdum est, ac varius magna vehicula nec. Donec egestas, dolor eget bibendum aliquet, tellus risus rhoncus lectus, at auctor sem turpis sit amet lectus. Vestibulum pharetra blandit ipsum, non pharetra ipsum ullamcorper ut. Morbi varius ligula vel hendrerit feugiat. Vivamus elementum, leo in efficitur laoreet, massa nisi accumsan erat, eget mattis ipsum lectus non odio. Pellentesque at augue condimentum, aliquet odio ac, malesuada tortor. Nunc iaculis ligula vitae porta congue. In ornare in quam et sollicitudin. Aliquam erat volutpat. Nullam eu vulputate libero."
//     }]; 

var data=[];

function seedDB(){
    Campground.deleteMany({}, function(err){
        if(err){
            console.log(err); 
        } else {
            console.log("removed Campground");
            data.forEach( function(seed){
                Campground.create(seed, function(err, campground){
                    if(err){
                        console.log(err);
                    } else {
                        console.log("created campground");
                        Comment.create(
                            {
                                text:"This is a great camp but I wish there was internet",
                                author: "william"
                            }, function(err, comment){
                                if(err){
                                    console.log(err);
                                } else {
                                    campground.comments.push(comment);
                                    campground.save();
                                    console.log("created new comments")
                                }
                        });
                    }
                });
            });
        }
    });
}

module.exports = seedDB;



