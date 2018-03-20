var express = require('express');
var router = express.Router();
var db = require('../db');

var expressValidator = require('express-validator'); //vaidate
var passport = require('passport');
var bcrypt = require('bcrypt');
const saltRounds = 10;
/* GET home page. */
router.get('/',isAuthent(), function(req, res, next) {
        res.render('index', {title: 'Express'});
});

router.get('/signup',isAuthent(), function(req, res, next) {
        res.render('signup', { title: 'Express',errors: false });

});

router.get('/home',isAuthen(), function(req, res, next) {
    res.render('home', { title: 'Home'});

});
router.get('/wall',isAuthen(), function(req, res, next) {
    res.render('wall', { title: 'Wall'});

});

router.get('/settings',isAuthen(), function(req, res, next) {
    res.render('settings', { title: 'Settings'});

});

router.get('/logout',  function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

router.post('/login', passport.authenticate('local',
    { successRedirect: '/profile',
        failureRedirect: '/',
        failureFlash: true })
);


router.post('/signup', function(req,res,next){
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        req.checkBody("username","Username cannot be empty!").notEmpty();
        req.checkBody("email","Email is not valid!").isEmail();
        req.checkBody("cpassword","Password do not match!").equals(req.body.password);
        req.checkBody("username","Username must be between 4-15 characters long").len(4,15);

        var errors = req.validationErrors();
        if (errors) {
            //console.log(errors);
            res.render('signup', { title: 'Registration Error', errors:errors });

        }else{
            db.query("INSERT INTO user (username,email,password) VALUES (?,?,?)",[username,email,hash],function (err,result,field) {
                if(err) throw err;

                // db.query("SELECT LAST_INSERT_ID() as user_id",function (error,results,fields) {
                //     if(error) throw error;
                //     const user_id= results[0];
                //     console.log(user_id);
                //     req.login(user_id,function (err) {
                //         res.redirect('/profile')
                //     })
                // });

                res.render('index', { title: 'Registration Complete' });
            })
        }


    });


});

router.get('/profile',isAuthen(), function(req, res, next) {
    res.render('profile', { title: 'Profile' });
});

passport.serializeUser(function(user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);

});

function isAuthen() {
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    return (req,res,next)=> {
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/');

    }


    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
}
function isAuthent() {
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    return (req,res,next)=> {
        if (!req.isAuthenticated()){
            return next();
        }
        res.redirect('/profile');

    }


    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
}
module.exports = router;
