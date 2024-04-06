const User = require('../models/user')

//Render the SignIn Page
module.exports.SignIn = function(req, res){
    res.render('user_sign_in');
}

//Render the SignUp Page
module.exports.SignUp = function(req, res){
    res.render('user_sign_up');
}

//Get the sign up Data 
module.exports.create = async function(req, res){
    try {
        if (req.body.password != req.body.confirmPassword) {
            req.flash('error', 'Passwords do not match');
            return res.redirect('back');
        }

        let user = await User.findOne({ email: req.body.email });
        if (!user) {
            await User.create(req.body);
            req.flash('success', 'User Created succesfully');
            return res.redirect('back');
        }
        else {
            req.flash('error', 'User Already exits,Try signing in');
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log('Error', err);
        return res.redirect('back');
    }
}

//Sign in and create the session for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout(req.user, err => {
        if (err){
            return res.redirect('back');
        } 
        req.flash('success','You have logged out!');
        return res.redirect('/users/Signin');
    });
}