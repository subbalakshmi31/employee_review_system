const express = require('express');
const passport = require('passport');

const router = express.Router();

const userProfile = require('../controllers/user_controller');

router.get('/Signin', passport.restrictAccess, userProfile.SignIn);
router.get('/Signup', passport.restrictAccess, userProfile.SignUp);
router.post('/create', userProfile.create);

//use passport as a middleware to Authenticate
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/users/Signin'}
), userProfile.createSession);

router.get('/Signout', userProfile.destroySession);

module.exports = router;