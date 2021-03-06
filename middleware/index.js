// all middleware functions
var Campground = require("../models/campground.js");
var Comment = require("../models/comment.js");

var middlewareObj = {};

middlewareObj.checkCampgroundOwenership = function(req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                console.log(err);
                req.flash("error", "Campground not found");
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                    next();   
                } else {
                    req.flash("error", "You don't have permission");
                    res.redirect("back");
                }
            }
        }); 
    } else {
        req.flash("error", "Please login first");
        res.redirect("/login");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please login first");
    res.redirect("/login");
};

middlewareObj.checkCommentOwenership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comments_id, function(err, foundComment) {
            if(err){
                console.log(err);
                req.flash("error", "Comment not found");
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "You don't have permission");
                    res.redirect("back"); 
                }
            }
        });
    } else {
        req.flash("error", "Please login first");
        res.redirect("/login");
    }
};

module.exports = middlewareObj;