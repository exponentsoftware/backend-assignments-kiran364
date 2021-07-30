const router = require('express').Router();
const mongoose = require('mongoose');
const ToDo = require('../models/todoModel');


// create new ToDo

router.post('/', async (req, res) =>{
    try {
        const {name, todotitle, status, category} = req.body;
        const newtodo = new ToDo({name, todotitle, status, category});
        const savetodo = await newtodo.save();
        res.status(200).json(savetodo)

    } catch (err) {
        console.log(err);
    }
})

// update ToDo

router.patch('/', async (req, res) => {
    const {name, status, updatedDate } = req.body;
    const userExit = await ToDo.findOne({name:name})
    if(userExit) {
        const key = userExit._id;
        const updateuser = new ToDo({status, updatedDate});
        ToDo.findByIdAndUpdate(key, {status: req.body.status, updatedDate: new Date()}).then(() => {
            res.status(200).json({message: "ToDo updated.."})
        })
    }
})

//get all ToDo List

// router.get("/", async (req, res) => {
//     try {
//       const data = await ToDo.find();
//       res.status(200).json(data);
//     } catch (err) {
//       res.status(500).json(err);
//   }
// })

//get by Id

router.get("/:id", async (req, res) => {
    try {
        const data = await ToDo.findById(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
  });

//delete by Id

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ToDo with id: ${id}`);
  
    await ToDo.findByIdAndRemove(id);
  
    res.json({ message: "ToDo deleted successfully." });
  });

// fetch by category

router.get("/", async (req, res) => {
    const {category} = req.body;
    try {
      const data = await ToDo.find({category:category});
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
  }
})

//search by title

router.get("/", async (req, res) => {
    const {todotitle} = req.body;
    try {
      const data = await ToDo.findOne({todotitle:todotitle});
      console.log(data)
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json("message: title is not present in ToDo list");
  }
})

  
  module.exports = router;