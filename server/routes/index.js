//Index.js holding all routes
//All required modules and paths
//===================================

var express = require('express');
var passport = require('passport');
var path = require('path');
var router = express.Router();
var User = require('../../models/user');
var SubUser = require('../../models/subUser');
var Task = require('../../models/task');
//===================================
//All get routes that send to html view

router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
});

router.get('/userIndex', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/userIndex.html'));
});
//===================================
//All gets that use angular routes

router.get('/register', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/registration.html'));
});

router.get('/login', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/login.html'));
});

router.get('/userAdmin', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/userAdmin.html'));
});

router.get('/userChild', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/userChild.html'));
});

router.get('/success', function(request, response){
    request.user.password = 'password is secret SORRY!!!!';
    response.send(request.user);
});

router.get('/failure', function(request, response){
    response.send('failure');
});

router.get('/userlogin/:id', function(request, response){

    User.find({_id: request.params.id}, function (err, assignments) {
        if (err) {
            console.log(err);
        } else {
            response.send(assignments);
        }
    });
});
//===================================
//post calls





//===================================
//post call for passport authentication
router.post('/', passport.authenticate('local', {
    successRedirect: '/success', failureRedirect:'/failure'
}));
//===================================
//Model in database creation

router.post('/createTask', function(request, response){
    Task.create({
        task_name: request.body.taskName,
        task_money: request.body.taskMoney,
        task_priority: request.body.taskPriority
    })
});
router.post('/registerAdmin', function(request, response){
    User.create({
        username: request.body.username,
        password: request.body.password,
        role: 'admin',
        email_address: request.body.email_address,
        sub_users: []

    }, function(err, post){
        if(err) {
            next(err);
        } else {
            response.redirect('/')
        }
    });
});

router.post('/registerUser', function(request, response){
    SubUser.create({
        username: request.body.username,
        password: request.body.password,
        assigned_task: [],
        role: 'user',
        urgent_task: 0
    }, function(err, post){
        if(err) {
            next(err);
        } else {
            response.redirect('/userIndex')
        }
    });
});
//===================================
//exporting the router
module.exports = router;