var express = require('express');
var router = express.Router();
var db = require('../db');
var dateFormat = require('dateformat');
var format = require('date-format');

var expressValidator = require('express-validator');

router.get('/',isAuthen(), function(req, res, next) {
    const id = req.user['user_id'];
    db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
        if(err) throw err;
        res.render('admin/index', {title: 'Admin',result:result});

    });
});
router.get('/profile',isAuthen(), function(req, res, next) {
    const id = req.user['user_id'];
    db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
        if(err) throw err;
        res.render('admin/profile', {title: 'Admin',result:result});

    });
});

router.get('/events',isAuthen(), function(req, res, next) {
    const id = req.user['user_id'];
    db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
        if(err) throw err;
        var query1=db.query("SELECT * FROM `event` LEFT JOIN user ON event.u_id= user.id LEFT JOIN organization ON event.o_id=organization.o_id WHERE event.status=1",function (err,evtlocations,field) {
            if(err) throw err;

            db.query("SELECT * FROM `event` LEFT JOIN user ON event.u_id= user.id LEFT JOIN organization ON event.o_id=organization.o_id WHERE event.status=0",function(err,pendingevents,field){
                if(err) throw err;
                res.render('admin/events', {title: 'Admin',result:result,evtlocations:evtlocations,pendingevents:pendingevents,format:format});

            })


        });

    });
});

router.get('/approveEvent',isAuthen(), function (req,res,next) {
    var eid = req.query['eid'];
    console.log(eid);
    db.query("UPDATE `event` SET `status` = '1' WHERE `event`.`e_id` = ?;",[eid],function (err,result,field) {
        if(err) throw err;
        var query1=db.query("SELECT * FROM `event` LEFT JOIN user ON event.u_id= user.id LEFT JOIN organization ON event.o_id=organization.o_id WHERE event.status=1",function (err,evtlocations,field) {
            if(err) throw err;

            db.query("SELECT * FROM `event` LEFT JOIN user ON event.u_id= user.id LEFT JOIN organization ON event.o_id=organization.o_id WHERE event.status=0",function(err,pendingevents,field){
                if(err) throw err;
                res.render('admin/eventlist', {evtlocations:evtlocations,pendingevents:pendingevents,format:format});

            })


        });

    })

});

router.get('/deleteEvent',isAuthen(), function (req,res,next) {
    var eid = req.query['eid'];
    console.log(eid);
    db.query("DELETE FROM `event` WHERE `event`.`e_id` = ?;",[eid],function (err,result,field) {
        if(err) throw err;
        var query1=db.query("SELECT * FROM `event` LEFT JOIN user ON event.u_id= user.id LEFT JOIN organization ON event.o_id=organization.o_id WHERE event.status=1",function (err,evtlocations,field) {
            if(err) throw err;

            db.query("SELECT * FROM `event` LEFT JOIN user ON event.u_id= user.id LEFT JOIN organization ON event.o_id=organization.o_id WHERE event.status=0",function(err,pendingevents,field){
                if(err) throw err;
                res.render('admin/eventlist', {evtlocations:evtlocations,pendingevents:pendingevents,format:format});

            })


        });

    })

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