
var mongoose = require('mongoose');
var TasksSchema = require('./task').schema;
var Schema = mongoose.Schema;

//===================================
//creates schema with keys and values
var SubUserSchema = new Schema({
    username: String,
    password: String,
    assigned_task: [TasksSchema],
    role: String,
    urgent_task: Number,
    total_money: Number
});

//===================================
//creates model to be used by database

//===================================
//exports module for use globally

//module.exports = SubUserAssignment;

module.exports = mongoose.model('SubUser', SubUserSchema);

