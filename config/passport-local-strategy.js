const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

//authenticating using passport
passport.use(new LocalStrategy({
       usernameField : 'email',
       passReqToCallback : true
    },
    async function(req, email, password, done){
      //find a user and establish the identity
    try {
        const findUser = await User.findOne({email: email});
        if(!findUser || findUser.password != password){
            req.flash('error','Invalid Username/Password');
            return done(null, false);
        }
        return done(null, findUser); 
    }catch(err) {
        req.flash('error',err);
        return done(err);
    }}
));

//serialising the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(async function(id, done){
    try {
        const findUser = await User.findById(id);
        return done(null, findUser);     
    }catch(err) {
        console.error('Error in finding User --> Passport');
        return done(err);
    }
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

passport.restrictAccess = function(req, res, next){
    if (req.isAuthenticated() && req.user.permission != 'admin'){
       return res.redirect('back');
    }
    next();
}

passport.restrictAccessPages = function(req, res, next){
    if (req.isAuthenticated() && req.user.permission == 'admin') {
        next();
    }
    else{
        return res.redirect('back');
    }
}

module.exports = passport;