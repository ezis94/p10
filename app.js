var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var https = require("https");
var fs = require("fs");
var engines = require("consolidate");

var APP_ID = "https://localhost:4433";

var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;

var mongoose = require("mongoose");
var flash = require("connect-flash");
var session = require("express-session");

var routes = require("./routes/index");
var users = require("./routes/users");
var api = require("./api/route/api");

var configDB = require("./config/database.js");
mongoose.connect('mongodb://P10:P10Pass1@ds151523.mlab.com:51523/heroku_6jkcdgb5');

var cors = require('cors')

var app = express();
app.use(cors());

app.engine("html", engines.hogan);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({ secret: "shhsecret", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require("./api/config/passport")(passport);

app.use("/", routes);
app.use("/users", users);
app.use("/api", api);

app.use(function(req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

//Changed the path to ones i needed
// original values are commented out
var credentials = {
  key: fs.readFileSync("./insecure-key.pem"),
  cert: fs.readFileSync("./insecure-certificate.pem")
  // key: fs.readFileSync("./insecure-key.pem"),
  // cert: fs.readFileSync("./insecure-certificate.pem")
};

var httpsServer = https.createServer(credentials, app);
httpsServer.listen(5000);

module.exports = app;
