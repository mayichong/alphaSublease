var express = require("express"),
    bodyParser = require("body-parser"),
    app = express(),
    mongoose = require("mongoose"),
    methodOverride = require("method-override"),
    expressSanitizer = require("express-sanitizer"),
    flash = require("connect-flash"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user")

var itemRoutes = require("./routes/itemRoute"),
    commentRoutes = require("./routes/commentRoute"),
    authRoutes = require("./routes/auth");

//mongoose.connect("mongodb://localhost/items",{ useNewUrlParser: true });
mongoose.connect("mongodb://mayichong:Mayi9765@ds219095.mlab.com:19095/person",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressSanitizer());
app.use(express.static("style"));
app.use(methodOverride("_method"));
app.use(flash());
app.set("view engine","ejs");

//Passport setup
app.use(require("express-session")({
    secret: "You found the secret!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(itemRoutes);
app.use(commentRoutes);
app.use(authRoutes);

app.listen(process.env.PORT, process.env.IP,function(){
    console.log("listening...");
});