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
    var loc=[];
    const id = req.user['user_id'];
    db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
        if(err) throw err;
        var query = db.query("SELECT * FROM `organization` WHERE `o_id` IN (SELECT `o_id` FROM org_admin WHERE u_id = ?) ",[id],function (err,rows,field) {
            //console.log(query.sql);
            if(err) throw err;
            var query1=db.query("SELECT * FROM event",function (err,evtlocations,field) {
                if(err) throw err;
                //console.log(query1.sql);
                for(var i=0;i<evtlocations.length;i++){
                    loc.push([evtlocations[i].lat,evtlocations[i].lng]);
                }
                console.log(loc);
                res.render('home', { title: 'Home',result:result,rows:rows,evtlocations:evtlocations});

            });
        });


    })


});
router.get('/wall',isAuthen(), function(req, res, next) {
    const id = req.user['user_id'];
    db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
        if(err) throw err;
        var query = db.query("SELECT * FROM `organization` WHERE `o_id` IN (SELECT `o_id` FROM org_admin WHERE u_id = ?) ",[id],function (err,rows,field) {
            //console.log(query.sql);
            if(err) throw err;
            res.render('wall', { title: 'Wall',result:result,rows:rows});

        });


    })


});

router.get('/settings',isAuthen(), function(req, res, next) {

    const id = req.user['user_id'];
    db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
        if(err) throw err;
        var query = db.query("SELECT * FROM `organization` WHERE `o_id` IN (SELECT `o_id` FROM org_admin WHERE u_id = ?) ",[id],function (err,rows,field) {
            //console.log(query.sql);
            if(err) throw err;
            res.render('settings', { title: 'Settings',result:result,rows:rows});


        });

    })


});

router.get('/profile',isAuthen(), function(req, res, next) {
    const id = req.user['user_id'];
    db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
        if(err) throw err;
        var query = db.query("SELECT * FROM `organization` WHERE `o_id` IN (SELECT `o_id` FROM org_admin WHERE u_id = ?) ",[id],function (err,rows,field) {
            //console.log(query.sql);
            if(err) throw err;
            res.render('profile', { title: 'Profile' ,result:result,rows:rows });
        });

    })



});

router.get('/organization',isAuthen(), function(req, res, next) {
    const id = req.user['user_id'];
    db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
        if(err) throw err;
        //console.log(result);
        var query = db.query("SELECT * FROM `organization` WHERE `o_id` IN (SELECT `o_id` FROM org_admin WHERE u_id = ?) ",[id],function (err,rows,field) {
            //console.log(query.sql);
            if(err) throw err;
            res.render('organization', { title: 'Create Organization' ,result:result ,errors: false,flash:false,rows:rows});

        });
    })

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

router.post('/update',function (req,res,next) {
    const id = req.user['user_id'];

    const fname=req.body.fname;
    const lname=req.body.lname;
    const email=req.body.email;
    const nic=req.body.nic;
    const gender=req.body.gender;
    const address=req.body.address;
    const city=req.body.city;
    const mobile=req.body.mobile;
    const province=req.body.province;
    const district=req.body.district;
    const dob= req.body.year +"-"+req.body.month+"-"+req.body.date;

    //console.log(fname+" "+lname+" "+email+" "+nic+" "+gender+" "+address+" "+city+" "+mobile+" "+province+" "+district+" "+dob);


    req.checkBody("email","Email is not valid!").isEmail();
    req.checkBody("nic","NIC number is invalid! eg:95xxxxxxxV").len(0,10);
    req.checkBody("mobile","Mobile number is invalid! eg:07xxxxxxxx").len(0,10);

    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        res.redirect('/profile');

    }else{
        var query = db.query("UPDATE user SET fname=?,lname=?,email=?,nic=?,address=?,city=?,mobile=?,province=?,district=?,dob=?,gender=? WHERE id=?",[fname,lname,email,nic,address,city,mobile,province,district,dob,gender,id],function (err,result,field) {
            if(err) throw err;
            res.redirect('/profile');
        })
        //console.log(query.sql);
    }
});

router.post('/organization',function (req,res,next) {
    const id= req.user['user_id'];

    const name= req.body.name;
    const email= req.body.email;
    const about= req.body.about;

    req.checkBody("name","Organization name cannot be empty!").notEmpty();
    req.checkBody("email","You should enter a valid email!").isEmail();
    req.checkBody("cemail","Email do not match!").equals(req.body.email);
    req.checkBody("about","Describe your organization little bit!").notEmpty();

    var errors = req.validationErrors();

    //console.log(id+" "+name+" "+email+" "+about);

    if (errors) {
        console.log(errors);
        db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
            if(err) throw err;
            var query = db.query("SELECT * FROM `organization` WHERE `o_id` IN (SELECT `o_id` FROM org_admin WHERE u_id = ?) ",[id],function (err,rows,field) {
                //console.log(query.sql);
                if(err) throw err;
                res.render('organization', { title: 'Create Organization' ,result:result ,errors: errors,flash:false,rows:rows});


            });
        })

    }else{
        var query1 = db.query("INSERT INTO organization (o_name,o_email,o_about,o_user) VALUES (?,?,?,?)",[name,email,about,id],function (err,result,field) {
            //console.log(query1.sql);
            if(err) throw err;

            var query2 = db.query("SELECT LAST_INSERT_ID() as org_id",function (error,results,fields) {
                //console.log(query2.sql);
                if(error) throw error;
                const org_id= results[0].org_id;

                var query3=db.query("INSERT INTO org_admin (u_id,o_id) VALUES (?,?)",[id,org_id],function (err1,result,field) {
                    //console.log(query3.sql);
                    if(err1)  throw err1;


                })
            });
        })
        db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
            if(err) throw err;
            var query = db.query("SELECT * FROM `organization` WHERE `o_id` IN (SELECT `o_id` FROM org_admin WHERE u_id = ?) ",[id],function (err,rows,field) {
                //console.log(query.sql);
                if(err) throw err;
                res.render('organization', { title: 'Create Organization' ,result:result ,errors: errors,flash:"It's done!",rows:rows});

            });
        })

    }

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
        if (req.isAuthenticated()){
            if(req.user['log']==0){
                return next();
            }else {
                res.redirect('/org');
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

function getPages() {
    var query=  db.query("SELECT * FROM `organization` WHERE `o_id` IN (SELECT `o_id` FROM org_admin WHERE u_id = ? ",[req.user['user_id']],function (err,rows,field) {
                if(err) throw err;
                return rows;
    });
}

var getResult = function(id,resu) {

    var query=  db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
                if(err) throw err;



    })
    console.log(resu);
    return resu;

}

module.exports = router;
