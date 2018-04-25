var express = require('express');
var router = express.Router();
var db = require('../db');
var multer  = require('multer');
var path = require('path');
var fs = require('fs-extra');

var expressValidator = require('express-validator'); //vaidate
var passport = require('passport');
var bcrypt = require('bcryptjs');
const saltRounds = 10;


/* GET home page. */
router.get('/',isAuthent(), function(req, res, next) {
        res.render('index', {title: 'Express'});
});

router.get('/signup',isAuthent(), function(req, res, next) {
        res.render('signup', { title: 'Express',errors: false });

});

router.get('/home',isAuthen(), function(req, res, next) {
    var sucess = req.query['sucess'];
    var errors = req.query['errors'];
    const id = req.user['user_id'];
    db.query("SELECT * FROM user WHERE id= ?",[id],function (err,result,field) {
        if(err) throw err;
        var query = db.query("SELECT * FROM `organization` WHERE `o_id` IN (SELECT `o_id` FROM org_admin WHERE u_id = ?) ",[id],function (err,rows,field) {
            //console.log(query.sql);
            if(err) throw err;
            var query1=db.query("SELECT * FROM event",function (err,evtlocations,field) {
                if(err) throw err;

                if(errors){
                    var array = JSON.parse(errors);
                    res.render('home', { title: 'Home',result:result,rows:rows,evtlocations:evtlocations,err:array,tab:3,sucess:false});

                }else if(sucess){
                    res.render('home', { title: 'Home',result:result,rows:rows,evtlocations:evtlocations,err:false,tab:3,sucess:sucess});

                }
                else{
                    res.render('home', { title: 'Home',result:result,rows:rows,evtlocations:evtlocations,err:false,tab:1,sucess:false});

                }

            });
        });


    });


});

router.get('/eventmap',isAuthen(),function (req,res,next) {
    const id = req.user['user_id'];
    var query1=db.query("SELECT * FROM event",function (err,evtlocations,field) {
        if(err) throw err;

        res.render('eventmap', { title: 'Home',evtlocations:evtlocations});

    });

})
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
    {
        successRedirect: '/home',
        failureRedirect: '/',
        failureFlash: true }
        )
);


router.post('/signup', function(req,res,next){
    const username = req.body.username;
    const fname = req.body.fname;
    const lname = req.body.lname;

    const email = req.body.email;
    const password = req.body.password;
    const cpassword = req.body.cpassword;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        req.checkBody("username","Username cannot be empty!").notEmpty();
        req.checkBody("fname","First name cannot be empty!").notEmpty();
        req.checkBody("lname","Last name cannot be empty!").notEmpty();

        req.checkBody("email","Email is not valid!").isEmail();
        req.checkBody("cpassword","Password do not match!").equals(req.body.password);
        req.checkBody("username","Username must be between 4-15 characters long").len(4,15);

        var errors = req.validationErrors();
        if (errors) {
            //console.log(errors);
            res.render('signup', { title: 'Registration Error', errors:errors });

        }else{
            db.query("INSERT INTO user (username,email,password,fname,lname) VALUES (?,?,?,?,?)",[username,email,hash,fname,lname],function (err,result,field) {
                if(err) throw err;

                db.query("SELECT LAST_INSERT_ID() as user_id",function (error,results,fields) {
                    if(error) throw error;
                    const user_id= results[0].user_id;
                    console.log(user_id);
                    var dir = 'public/uploads/'+user_id;
                    if (!fs.existsSync(dir)){
                        fs.mkdirSync(dir);
                    }
                    // fs.copy('public/uploads/profile_pic.jpg', dir, err => {
                    //     if (err) return console.error(err)
                    //
                    //     console.log('success!');
                    // });
                });

                res.render('index', { title: 'Registration Complete' });
            });
        }


    });


});

router.post('/usernameCheck',function (req,res,next) {
    var uname = req.body.user_name;
    //console.log(uname.length);
    db.query("SELECT * FROM user WHERE username=? ",[uname],function (err,result,field) {
        if(err) throw err;
        if (uname.length<5){
            var str = "<span style=\"color:red;font-weight:bold\">username is too short</span>";
        }
        else if(result.length==0){
            var str = "<span style=\"color:greenyellow;font-weight:bold\">username is avalable!</span>";

        }else if(result.length>0){
            var str = "<span style=\"color:red;font-weight:bold\">username is not avalable!</span>";

        }
        res.send(str);


    });
});
router.post('/emailCheck',function (req,res,next) {
    var email = req.body.email;
    req.checkBody("email","Email is not valid!").isEmail();
    var errors = req.validationErrors();

    db.query("SELECT * FROM user WHERE email=? ",[email],function (err,result,field) {
        if(err) throw err;
        if (errors){
            var str = "<span style=\"color:red;font-weight:bold\">email is not valid</span>";
        }
        else if(result.length==0){
            var str = "<span style=\"color:greenyellow;font-weight:bold\">email is avalable!</span>";

        }else if(result.length>0){
            var str = "<span style=\"color:red;font-weight:bold\">this email already have an account!</span>";

        }
        res.send(str);


    });
})

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

});

router.post('/addEvent',function (req,res,next) {
    const id= req.user['user_id'];

    var caption = req.body.caption;
    var date = req.body.date;
    var address = req.body.address;
    var city = req.body.city;
    var zip = req.body.zip;
    var district =req.body.district;
    var category = req.body.category;
    var description = req.body.description;
    var latitude = req.body.latitude;
    var longitude = req.body.longitude;

    req.checkBody("caption","Caption cannot be empty!").notEmpty();
    req.checkBody("date","You should provide a event date!").notEmpty();
    req.checkBody("address","Address cannot be empty!").notEmpty();
    req.checkBody("zip","Invalid zip code!").isInt();
    req.checkBody("description","Please describe your event at least 5 sentences!").isLength({ min: 20 });
    req.checkBody("latitude","Choose the event location from map!").notEmpty();

    var errors = req.validationErrors();

    if(errors){
        //console.log(errors);
        var err= JSON.stringify(errors);
        var string= "?errors="+err;
        res.redirect('/home' + string);
    }else{
        //console.log(caption+" "+date+" "+address+" "+city+" "+zip+" "+district+" "+category+" "+description+" "+latitude+" "+longitude);
        var query1 = db.query("INSERT INTO `event` (`lat`, `lng`, `city`, `description`, `event_cat_id`, `caption`, `date`, `address`, `district`, `u_id`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",[latitude,longitude,city,description,category,caption,date,address,district,id],function (err,result,field) {
            //console.log(query1.sql);
            if(err) throw err;
            var string= "?sucess="+1;
            res.redirect('/home'+ string);

        });

    }

});


passport.serializeUser(function(user_id, done) {
    done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
    done(null, user_id);

});

function isAuthen() {
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
                res.redirect('/home');
            }else {
                res.redirect('/org');
            }
        }



    }


    // IF A USER ISN'T LOGGED IN, THEN REDIRECT THEM SOMEWHERE
}




router.post('/changePP', function (req, res) {
    const id= req.user['user_id'];
    var dir = 'public/uploads/'+id;

    var storage = multer.diskStorage({

        destination: function (req, file, cb) {
            cb(null, dir)
        },
        filename: function (req, file, cb) {
            cb(null, "profile_pic.jpg")
                //path.extname(file.originalname))
        }
    })

    var upload = multer({ storage: storage }).single('profilepicture');

    upload(req, res, function (err) {
        if (err) {
            throw err;

        }else{
            res.redirect('/profile');
        }


    });

});





module.exports = router;
