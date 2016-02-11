
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

//===================================
//creates schema with keys and values
var TasksSchema = new Schema({task_name: String, task_money: Number, task_priority: Number});

//===================================
//creates model to be used by database

//var TaskAssignment
module.exports= mongoose.model('Task', TasksSchema);
//===================================
//exports module for use globally

//exports.schema = TasksSchema;
//exports.model = TaskAssignment;
