var express = require("express");
var router = express.Router({mergeParams: true});
var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middleware = require("../middleware/index.js");

//commenst new
router.get("/new", middleware.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {campground: campground});
        }
    });
});

//comments create
router.post("/", middleware.isLoggedIn, function(req,res){
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else{
            var newComment = {
                text: req.body.text,
                author: {
                    id: req.user.id,
                    username: req.user.username
                }
            };
            Comment.create(newComment, function(err, comment){
                if(err){
                    res.redirect("/campgrounds");
                } else{
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/"+ req.params.id);
                }
            });
        }
    });
});

router.get("/:comments_id/edit", middleware.checkCommentOwenership, function(req, res) {
    Comment.findById(req.params.comments_id, function(err, foundComment){
        res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
    });
});


router.put("/:comments_id", middleware.checkCommentOwenership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comment, function(err, updatedComment){
        if(err){
            console.log(err);
            res.redierct("campgrounds/");
        } else{
            req.flash("success", "Comment edited");
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:comments_id", middleware.checkCommentOwenership, function(req, res){
    Comment.findByIdAndDelete(req.params.comments_id, function(err){
            if(err){
                console.log(err);
                res.redirect("back");
        } else {
            req.flash("success", "Comment Deleted");
            res.redirect("/campgrounds/" +  req.params.id);
        }
    });
});


module.exports = router;