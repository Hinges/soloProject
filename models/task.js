
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//===================================
//creates schema with keys and values
var TasksSchema = new Schema({task_name: String, task_money: Number, task_priority: Number});

//===================================
//creates model to be used by database

var TaskAssignment = mongoose.model('Task', TasksSchema);
//===================================
//exports module for use globally

module.exports = TaskAssignment;