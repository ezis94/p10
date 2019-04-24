var LocalStrategy = require("passport-local").Strategy;

var Users = require('../model/users');

module.exports = function(passport) {
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        Users.findById(id, function(err, user) {
            if (user) done(err, user);
            else
                Console.log("unfrtunate");
        });
    });

    passport.use("local-signup", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function(req, username, password, done) {
            process.nextTick(function() {
                Users.findOne({ "username": username }, function(err, user) {
                    if (err) return done(err);
                    if (user) {
                        console.log("no such user");
                        return done(
                            null,
                            false,
                            req.flash("signupMessage", "That username already exists.")
                        );
                    }
                    else {
                        console.log("------------saving user---------");
                        var newUser = new Users();
                        newUser.username = username;
                        newUser.password = newUser.generateHash(password);
                        newUser.save(function(err) {
                            return done(null, newUser);
                        });
                    }
                });
            });
        }
    ));

    passport.use("local-login", new LocalStrategy(
        {
            usernameField: "username",
            passwordField: "password",
            passReqToCallback: true
        },
        function(req, username, password, done) {

            process.nextTick(function() {

                Users.findOne({"username": username}, function (err, user) {

                    if (err) return done(err);
                    if (!user)
                        return done(null, false, req.flash("loginMessage", "No user found."));
                    if (!user.validPassword(password))
                        return done(null, false, req.flash("loginMessage", "Oops! Wrong password."));
                    console.log("successfull login");
                    return done(null, user);
                });
            });
        }
    ));
};
