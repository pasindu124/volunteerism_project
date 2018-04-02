var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var expressValidator = require('express-validator');
var bcrypt = require('bcrypt');

var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);

var db = require('./db');
var index = require('./routes/index');
var users = require('./routes/users');
var org = require('./routes/org');
var admin = require('./routes/admin');

var app = express();

require('dotenv').config();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var options = {
    host: 'localhost',
    //port: 3306,
    user: 'root',
    password: '',
    database: 'vnd'
};

var sessionStore = new MySQLStore(options);

app.use(session({
    secret: 'sdlfkjsdkflk',
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
    //cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function (req,res,next) {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

// app.use(function getData(req,res,next) {
//     console.log("Pasindu is hero!");
//     next();
// })

app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressValidator());

app.use('/', index);
app.use('/users', users);
app.use('/org', org);
app.use('/admin', admin);

// app.use(app.router);
// routes.initialize(app);

passport.use(new LocalStrategy(
    function(username, password, done) {

        //console.log(username);
        //console.log(password);

        db.query("SELECT id,password,role FROM user WHERE username= ?",[username],function (err,results,fields) {
            if (err) {
                throw err;
            }
            if(results.length == 0 ){
                done(null,false);
            }else{
                const hash= results[0].password.toString();
                //console.log(hash);
                const id= results[0].id;
                const role=results[0].role;
                bcrypt.compare(password,hash,function (err,respond) {
                    if(respond === true){
                        //console.log(id);
                        return done(null, {user_id: id,log:0,role:role});
                    }else{
                        return done(null, false);

                    }
                })
            }



        });

    }
));
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
