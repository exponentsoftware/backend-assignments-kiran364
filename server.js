const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');

const ToDoList = require('./routes/todo');

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('database connected successfull...')
    
});

app.use(express.json());
app.use('/todolist', ToDoList);

app.listen(port, () => console.log(`server is runing at port no -${port}`));