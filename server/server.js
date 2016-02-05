//This is the start of the server
//================================================
//List of all the required modules and routes

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var path = require('path');
var localStrategy = require('passport-local').Strategy;
var index = require('./routes/index');
var userIndex = require('./routes/index');
var User = require('../models/user');

var app = express();
//=================================================
//List all use cases here


app.use(express.static('server/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret: 'secret',
    key: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 600000, secure: false}
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', index);
//=================================================
//Starting connection to Mongo Database either best choice or local host

var mongoURI = process.env.DATABASE_URL || 'mongodb://localhost:27017/soloProjectExample';
var mongoDB = mongoose.connect(mongoURI).connection;

mongoDB.on('error', function(err){
    console.log('MongoDB error: ', err);
});

mongoDB.on('open', function(){
    console.log('MongoDB connected!');
});
//==================================================
//Connection to passport and starting session

passport.serializeUser(function(user, done){

    done(null, user._id);
});
passport.deserializeUser(function(id, done){
    //Was user, why we couldn't find id
    User.findById(id, function(err, user){
        if(err){
            done(err);
        }

        console.log('Deserialized user', user);

        done(null, user);
    })
});
passport.use('local', new localStrategy({
        passReqToCallback:true, usernameField: 'username'},
    function(req, username, password, done){

        User.findOne({username: username}, function(err, user){
            if(err){
                console.log(err);
            }

            if(!user){
                return done(null, false);
            }

            if(user.password === password){
                console.log('valid password');
                return done(null, user);
            }
            return done(null, false);
        })
    }));
//==================================================
//Connecting our server to either best option or local host

var server = app.listen(process.env.PORT || 3000);
    var port = server.address().port;
    console.log('Listening on port', port);