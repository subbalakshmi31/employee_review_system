const express = require('express');
const cookieParser = require('cookie-parser');
const port = 8000;
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const flash = require('connect-flash');
const notyMware = require('./config/noty-middleware');
const db = require('./config/mongoose');
const User = require('./models/user');

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.use(express.static('assets'));
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name : 'employee review system',
    secret : 'kljsjsnd',
    saveUninitialized : false,
    resave : false,
    cookie : {
        maxAge : (1000 * 60 * 100)
    }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(notyMware.setFlash);

app.use('/', require('./routes/index'));

app.listen(port, function(err) {
    if(err){
        console.log(`Error in running the server : ${err}`);
    }
    console.log(`Server is running on port : ${port}`); 
})