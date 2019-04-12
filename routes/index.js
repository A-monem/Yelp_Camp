var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");


//route route
router.get("/", function(req, res){
    res.render("landing");
});

//sign up route
router.get("/register", function(req, res) {
    res.render("register");
});

router.post("/register", function(req, res) {
    User.register(new User({username:req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            res.render("register");
        }
        passport.authenticate("local")(req, res, function() {
            req.flash("success", "Welcome to YelpCamp " + req.body.username);
            res.redirect("/campgrounds");
        });
    });
});

//login routes
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
}), function(req, res) {});

//logout routes
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You are logged out");
    res.redirect("/campgrounds");
});

module.exports = router;