const express = require('express');
const router = express.Router();
const {Task, Board}= require('../models');

/* SECTION: routes */
/* Test NOTE: / Get: create new task */
router.get('/new',async (req,res,next)=>{
    try{
        const allBoards = await Board.find({})
        const context = {
            boards: allBoards,
        }
        return res.render('screens/task_screens/newTesting',context)
    }catch(error){
        return res.send(error.message)
    }
})

/* Test NOTE: / Get: create new task */
router.get('/',async (req,res,next)=>{
    try{
        const allTasks = await Task.find({})
        const context ={
            tasks: allTasks
        }
        //return res.send('all task')
        return res.render('screens/task_screens/indexTesting',context)
    }catch(error){
        return res.send(error.message)
    }
})


/* NOTE: / POST Functional: create new task */
router.post('/',async (req,res,next)=>{
    // console.log(('hit post route'))
    // res.send('hit post route')
    try{
    const newTask = await Task.create(req.body)
    //console.log(newTask)
    //replace this with redirect to board page
    return res.redirect(`/boards/${newTask.board}`)
    //return res.send(newTask)
    }catch(error){
        req.error = error;
        console.log(error);
        return next();
    }
});

/* NOTE: / GET Presentational: Edit page for specefic task*/
router.get('/:id/edit',async(req,res,next)=>{
    try{
        const foundTask = await Task.findById(req.params.id)
        const context = 
        {
            task:foundTask,
        };
        return res.render('screens/task_screens/edit',context);
    }catch(error){
        req.error = error;
        console.log(error);
        return next();
    }
})

/* NOTE: / PUT Functional: Edit Specefic task*/

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
        return res.redirect(`/tasks/${updatedTask.id}`)
        //return res.send(updatedTask)
        //return res.redirect(`/tasks/updatedTask._id`)
    }catch(error){
        req.error = error;
        console.log(error.message);
        return next();
    }
    
})


/* NOTE: / GET Presentational: show route for specefic task */
router.get('/:id',async (req,res,next)=>{
    try{
        const foundTask = await Task.findById(req.params.id).populate('board')

        console.log(foundTask)
        const context = {
            task: foundTask,
        }
        return res.render('screens/task_screens/show',context)
    }catch(error){
        req.error = error;
        console.log(error.message);
        return next();
    }
})


/* NOTE: / Delete Functional: delete Specefic task*/

router.delete('/:id',async(req,res,next)=>{
    try{
        const task = await Task.findById(req.params.id)
        const deletedTask = await Task.findByIdAndDelete(req.params.id)
        //return res.send(deletedTask)
        return res.redirect(`/boards/${task.board}`)
    }catch(error){
        req.error = error;
        console.log(error);
        return next();
    }
});


module.exports = router;