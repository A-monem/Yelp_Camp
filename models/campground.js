var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    lat: Number,
    lng: Number,
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }], 
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        },
        username: String
    }
});


module.exports = mongoose.model("Campground", campgroundSchema);