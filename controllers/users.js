const User = require("../models/user");
const catchAsync = require("../utils/catchAsync");

// Register
module.exports.renderRegister = (req, res) => {
    res.render("users/register");
};

module.exports.register = catchAsync(async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ username, email });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
        })
        req.flash("success", "Welcome to Yelp Camp!");
        res.redirect("/campgrounds");
    } catch (err) {
        req.flash("error", err.message);
        res.redirect("/register");
    }
});

// Login
module.exports.renderLogin = (req, res) => {
    res.render("users/login");
};

module.exports.login = (req, res) => {
    req.flash("success", "Welcome Back!");
    const redirectUrl = req.session.returnTo || "/campgrounds";
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

// Logout
module.exports.logout = (req, res) => {
    req.logout();
    req.flash("success", "Goodbye!");
    res.redirect("/campgrounds");
};