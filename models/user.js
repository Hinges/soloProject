//user.js holds schema for any new models
//All required modules and paths
//===================================

var mongoose = require('mongoose');
var SubUserSchema = require('../models/subUser').schema;
var Schema = mongoose.Schema;

//===================================
//creates schema with keys and values

var UserSchema = new Schema({
    username: String,
    password: String,
    role: String,
    email_address: String,
    sub_users: [SubUserSchema]
});

//===================================
//creates model to be used by database

var UserAssignment = mongoose.model('User', UserSchema);
//===================================
//exports module for use globally

module.exports = UserAssignment;