var express = require('express');
var router = express.Router();
var db = require('../db');

var expressValidator = require('express-validator');

router.get('/',isAuthen(), function(req, res, next) {
    res.render('admin/index', {title: 'Express'});
});
router.get('/profile',isAuthen(), function(req, res, next) {
    res.render('admin/profile', {title: 'Express'});
});








function isAuthen() {
    // do any checks you want to in here

    // CHECK THE USER STORED IN SESSION FOR A CUSTOM VARIABLE
    // you can do this however you want with whatever variables you set up
    return (req,res,next)=> {
        if (req.isAuthenticated()){
            if(req.user['log']==0 && req.user['role']=='admin'){
                return next();
            }else {
                res.redirect('/profile');
            }
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
        }else{
            if(req.user['log']==0){
                res.redirect('/profile');
            }else {
                res.redirect('/org');
            }
        }



    }


    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
}
module.exports = router;