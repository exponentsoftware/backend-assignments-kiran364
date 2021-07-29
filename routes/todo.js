const router = require('express').Router();
const mongoose = require('mongoose');
const ToDo = require('../models/todoModel');

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


router.get("/", async (req, res) => {
    try {
      const data = await ToDo.find();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
  }
})


router.get("/:id", async (req, res) => {
    try {
        const data = await ToDo.findById(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err);
    }
  });


router.delete('/:id', async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No ToDo with id: ${id}`);
  
    await ToDo.findByIdAndRemove(id);
  
    res.json({ message: "ToDo deleted successfully." });
  });


module.exports = router;