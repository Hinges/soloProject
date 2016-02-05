
var mongoose = require('mongoose');
var TasksSchema = require('../models/task');
var Schema = mongoose.Schema;

//===================================
//creates schema with keys and values
var SubUserSchema = new Schema({
    username: String,
    password: String,
    assigned_task: [TasksSchema],
    role: String,
    urgent_task: Number
});

//===================================
//creates model to be used by database

var SubUserAssignment = mongoose.model('SubUser', SubUserSchema);
//===================================
//exports module for use globally

//module.exports = SubUserAssignment;

exports.model = SubUserAssignment;
exports.schema = SubUserSchema;