const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    todoTitle: {
        type: String,
    },
    status: {
        type: String,
    },
    createdDate: Date,
    updatedDate: Date,
    category: String
  
},
   {timestamps: true})

const todoList = mongoose.model('todoList', todoSchema);
module.exports = todoList;