const express = require('express');
const router = express.Router();
const {Task}= require('../models');

/* SECTION: Export model */
router.post('/',async (req,res,next)=>{
    try{
    const newTask = await Task.create(req.body)
    console.log(newTask)
    //replace this with redirect to board page
    return res.send(newTask)
    }catch(error){
        req.error = error;
        console.log(error);
        return next();
    }
});

router.get('/:id',async (req,res,next)=>{
    try{
        const foundTask = await Task.findById(req.params.id);
        const context = {
            task: foundTask,
        }
        return res.send(context)
    }catch(error){
        req.error = error;
        console.log(error);
        return next();
    }
})

router.get('/:id/edit',async(req,res,next)=>{
    try{
        const foundTask = Task.findById(req.params.id)
        const context = 
        {
            task:foundTask,
        };
        return res.send(context);
    }catch(error){
        req.error = error;
        console.log(error);
        return next();
    }
})

router.put('/:id',async(req,res,next)=>{
    try{
        const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        {
            new:true,
        })
        console.log(updatedTask);
        return res.send(updatedTask)
        //return res.redirect(`/tasks/updatedTask._id`)
    }catch(error){
        req.error = error;
        console.log(error);
        return next();
    }
    
})

router.delete('/:id',async(req,res,next)=>{
    try{
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        return res.send(deletedTask)
        //return res.redirect('/boards')
    }catch(error){
        req.error = error;
        console.log(error);
        return next();
    }
})


module.exports = router;