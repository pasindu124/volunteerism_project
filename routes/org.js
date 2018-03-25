var express = require('express');
var router = express.Router();
var db = require('../db');

var expressValidator = require('express-validator'); //vaidate
var passport = require('passport');

router.get('/',isAuthen(), function(req, res, next) {
    //console.log(req.user);
    var org_id = req.user['org_id'];
    var user_id = req.user['user_id'];
    var query1= db.query("SELECT * FROM user WHERE id=?",[user_id],function (err,uresult,ufield) {
        //console.log(query1.sql);
        if(err) throw err;

        var query2= db.query("SELECT * FROM organization WHERE o_id=?",[org_id],function (err,oresult,ofield) {
            console.log(query2.sql);
            if(err) throw err;
            var query3 = db.query("SELECT * FROM `organization` WHERE `o_id` IN (SELECT `o_id` FROM org_admin WHERE u_id = ?) ",[user_id],function (err,rows,field) {
                //console.log(query.sql);
                if(err) throw err;
                res.render('org/index', {title: 'Home',uresult:uresult, oresult:oresult,rows:rows});
            });

        })
    })


});

router.get('/settings',isAuthen(), function(req, res, next) {
    var org_id = req.user['org_id'];
    var user_id = req.user['user_id'];
    var query1= db.query("SELECT * FROM user WHERE id=?",[user_id],function (err,uresult,ufield) {
        //console.log(query1.sql);
        if(err) throw err;

        var query2= db.query("SELECT * FROM organization WHERE o_id=?",[org_id],function (err,oresult,ofield) {
            //console.log(query2.sql);
            if(err) throw err;
            var query3 = db.query("SELECT * FROM `organization` WHERE `o_id` IN (SELECT `o_id` FROM org_admin WHERE u_id = ?) ",[user_id],function (err,rows,field) {
                //console.log(query.sql);
                if(err) throw err;

                var query4 = db.query("SELECT * FROM user WHERE id IN (SELECT `u_id` FROM `org_admin` WHERE `o_id`=?)",[org_id],function (err,admins,fiel) {
                    if(err) throw err;
                    res.render('org/settings', { title: 'Settings',uresult:uresult, oresult:oresult,rows:rows,admins:admins});


                })

            });

        })
    })



});

router.get('/login/:id',isAuthent(), function(req, res, next) {
    var user_id = req.user['user_id'];
    var org_id= req.params.id;
    db.query("SELECT * FROM `org_admin` WHERE `o_id`=? AND `u_id`=?",[org_id,user_id],function (err,results,fields) {
        if(err) throw err;
        if(results.length==0){
            res.redirect('/');
        }else{
            req.logout();
            //req.session.destroy();
            req.login({org_id: org_id,log:1,user_id:user_id},function (err) {
                res.redirect('/org');

            })
        }
    })

});

router.get('/log', function(req, res, next) {
    var user_id = req.user['user_id'];
    req.logout();
    //req.session.destroy();
    req.login({user_id:user_id,log:0},function (err) {
        res.redirect('/profile');

    })
});

router.get('/refreshAdminList',function (req,res,next) {
    var user_id = req.user['user_id'];
    var oid=req.user['org_id'];
    var uid=req.query['id'];
    //console.log(req.query);
    var query1 = db.query("DELETE FROM org_admin WHERE u_id=? AND o_id=?",[uid,oid],function (err,results,fields) {
        if(err) throw err;
        var query2 = db.query("SELECT * FROM user WHERE id IN (SELECT `u_id` FROM `org_admin` WHERE `o_id`=?)",[oid],function (err,result,field) {
            //console.log(query2.sql);
            if(err) throw err;

            var query1= db.query("SELECT * FROM user WHERE id=?",[user_id],function (err,uresult,ufield) {
                //console.log(query1.sql);
                if(err) throw err;
                res.render('org/adminlist',{admins:result,uresult:uresult,isvalid:1});

            });
        })
    })

});

router.get('/addAdmin',function (req,res,next) {
    var org_id = req.user['org_id'];
    var user_id = req.user['user_id'];

    var uname=req.query['uid'];

    var query1=db.query("SELECT * FROM user WHERE username=?",[uname],function (err,resul,field) {
        if(err) throw err;
        if(resul.length>0){
            var uid=resul[0].id;
            db.query("SELECT * FROM org_admin WHERE o_id=? AND u_id=?",[org_id,uid],function (err,result1,field1) {
                if (err) throw err;
                if(result1.length==0){
                    var query2=db.query("INSERT INTO org_admin (u_id,o_id) VALUES (?,?)",[uid,org_id],function (err,resu,fiel) {
                        if(err) throw err;
                        var query3 = db.query("SELECT * FROM user WHERE id IN (SELECT `u_id` FROM `org_admin` WHERE `o_id`=?)",[org_id],function (err,result,field) {
                            //console.log(query2.sql);
                            if(err) throw err;

                            var query4= db.query("SELECT * FROM user WHERE id=?",[user_id],function (err,uresult,ufield) {
                                //console.log(query1.sql);
                                if(err) throw err;

                                res.render('org/adminlist',{admins:result,uresult:uresult,isvalid:1});

                            });
                        });
                    });
                }else {
                    var query3 = db.query("SELECT * FROM user WHERE id IN (SELECT `u_id` FROM `org_admin` WHERE `o_id`=?)",[org_id],function (err,result,field) {
                        //console.log(query2.sql);
                        if(err) throw err;

                        var query4= db.query("SELECT * FROM user WHERE id=?",[user_id],function (err,uresult,ufield) {
                            //console.log(query1.sql);
                            if(err) throw err;

                            res.render('org/adminlist',{admins:result,uresult:uresult,isvalid:2});

                        });
                    });
                }

            });
        }else{
            var query3 = db.query("SELECT * FROM user WHERE id IN (SELECT `u_id` FROM `org_admin` WHERE `o_id`=?)",[org_id],function (err,result,field) {
                //console.log(query2.sql);
                if(err) throw err;

                var query4= db.query("SELECT * FROM user WHERE id=?",[user_id],function (err,uresult,ufield) {
                    //console.log(query1.sql);
                    if(err) throw err;

                    res.render('org/adminlist',{admins:result,uresult:uresult,isvalid:0});

                });
            });
        }



    });

})





















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
        if (req.isAuthenticated() && req.user['log']==1){
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
        if (req.isAuthenticated()){
            return next();
        }
        res.redirect('/');

    }


    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
}
module.exports = router;