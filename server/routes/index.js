//Index.js holding all routes
//All required modules and paths
//===================================

var express = require('express');
var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');
var router = express.Router();
var User = require('../../models/user');
var SubUser = require('../../models/subUser');
var Task = require('../../models/task');
//===================================
//All get routes that send to html view

router.get('/', function(request, response){
    response.sendFile(path.join(__dirname, '../public/views/index.html'));
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
    console.log('success');
});

router.get('/failure', function(request, response){
    response.send('failure');
    console.log('failure');
});

//===================================
//post calls

router.post('/updateUser', function(request, response){
    User.findOne({'sub_users._id':request.body.scopeData._id}, function(err, update) {
        var subTaskFind = update.sub_users.id(request.body.scopeData._id);
        var newSubTaskFind = subTaskFind.assigned_task.id(request.body.userTaskData._id);
        console.log('this is the newest variable', newSubTaskFind);
        if(newSubTaskFind.task_priority === 1){
            newSubTaskFind.task_priority = 2;
        }
        else if(newSubTaskFind.task_priority === 2){
            newSubTaskFind.task_priority = 3;
        }
        else if(newSubTaskFind.task_priority === 3){
            newSubTaskFind.task_priority = 1;
        }
        update.save(function(err, user) {
            if(err) throw err;
            console.log(user);
        });
        var holder = {
            update: update,
            subTaskFind: subTaskFind
        };
        response.send(holder);
    });

});

router.post('/deleteTask', function(request, response){
    User.findOne({'sub_users._id':request.body.scopeData._id}, function(err, update) {
        var subTaskFind = update.sub_users.id(request.body.scopeData._id);
        var newSubTaskFind = subTaskFind.assigned_task.id(request.body.userTaskData._id);
        newSubTaskFind.task_priority = 4;
        update.save(function(err, user) {
            if(err) throw err;
            console.log(user);
        });
        var holder = {
            update: update,
            subTaskFind: subTaskFind
        };
        response.send(holder);
    });

});


router.post('/updateMainUser', function(request, response){
    console.log('request', request.user._id);
    User.findOne({'_id':request.user._id}, function(err, update) {
        response.send(update);
        });
});

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
        task_priority: 1,
        task_urgent: false
    }, function(err, task){
        if(err) {
            next(err);
        }
        var data = request.body.selectedUser;
        User.findOne({'sub_users._id':data._id}, function(err, user){
            var subDocFind = user.sub_users.id(data._id);
                subDocFind.assigned_task.push(task);
                user.save(function (err) {
                    if (err) throw err;
                });
            var holder = {
                user: user,
                subDocFind: subDocFind
            };
            response.send(holder);
            });
    });
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
            response.redirect('/');
        }
    });
});

router.post('/registerUser', function(request, response){
    console.log('user register hit', request.body);
    console.log('current user', request.user);
    SubUser.create({
        username: request.body.username,
        password: request.body.password,
        assigned_task: [],
        role: 'user',
        urgent_task: 0,
        total_money: 0
    }, function(err, subuser){
        if(err) {
            next(err);
        }
        User.findOne({_id:request.user._id}, function(err, user){

            console.log('this is the user', user);
            console.log('this is the subuser', subuser);


            user.sub_users.push(subuser);

            user.save(function(err) {
                if(err) throw err;
            })
            response.send(user);

        });
    });
});
//===================================
//exporting the router
module.exports = router;