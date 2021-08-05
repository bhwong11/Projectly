const express = require('express');
const router = express.Router();
const {Task, Board}= require('../models');

/* SECTION: routes */
/* Test NOTE: / Get: create new task */
const formFieldRedirect = (req,res,next)=>{
    for(let key in req.body){
        if(!req.body[key]){
            req.session.error = `Please enter task ${key}`
            if(req.session.url==='/new'){
                return res.redirect('/tasks/new')
            }else if(req.session.url===`/${req.body.board}`){
                return res.redirect(`/boards/${req.body.board}`)
            }else if(req.session.url===`/${req.params.id}/edit`){
                return res.redirect(`/tasks/${req.params.id}/edit`)
            }
            
        }
    }
    next()
}
router.get('/new',async (req,res,next)=>{
    try{
        const allBoards = await Board.find({userId:req.session.currentUser.id})
        const context = {
            boards: allBoards,
            error: req.session.error || null,
        }
        req.session.error = null;
        req.session.url = req.path;
        return res.render('screens/task_screens/new',context)
    }catch(error){
        req.error = error;
        console.log(error)
        return next();
    }
})

/* Test NOTE: / Get: create new task */
router.get('/',async (req,res,next)=>{
    try{
        const allTasks = await Task.find({}).populate('board')
        let allTasksUser = allTasks.filter((task)=>{
            return task.board.userId.toString()===req.session.currentUser.id})
        if(req.query.q){
            allTasksUser = allTasksUser.filter((task)=>{
                return task.name.includes(req.query.q)
            })
        }
        const context ={
            tasks: allTasksUser,
            search: req.query.q || '',
        }
        req.session.url = req.path;
        return res.render('screens/task_screens/index',context)
    }catch(error){
        console.log(error)
        req.error = error
        return next()
    }
})


/* NOTE: / POST Functional: create new task */
router.post('/',formFieldRedirect,async (req,res,next)=>{
    try{
    const newTask = await Task.create(req.body)
    return res.redirect(`/boards/${newTask.board}`)
    }catch(error){
        console.log(error)
        req.error = error
        return next()
    }
});

/* NOTE: / Boards page test*/
router.get('/bords/:id',async (req,res,next)=>{
    try{
    const board = await Board.findById(req.params.id)
    const tasks = await Task.find({board:board.id}).populate('board')
    const context = {
        tasks,
    }
    req.session.url = req.path;
    return res.render('screens/task_screens/boardsTesting',context)
    }catch(error){
        res.send(error.message)
    }

})


/* NOTE: / GET Presentational: Edit page for specefic task*/
router.get('/:id/edit',async(req,res,next)=>{
    try{
        const foundTask = await Task.findById(req.params.id)
        if(!foundTask){
            throw new Error('No Task Found')
        }
        const context = 
        {
            task:foundTask,
            error: req.session.error || null,
        };
        req.session.error = null;
        req.session.url = req.path;
        return res.render('screens/task_screens/edit',context);
    }catch(error){
        error.message = `Could not find task id: ${req.params.id}`
        req.error = error;
        console.log(error);
        return next();
    }
})

/* NOTE: / PUT Functional: Edit Specefic task*/

router.put('/:id',formFieldRedirect,async(req,res,next)=>{
    try{
        const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        {
            $set:req.body
        },
        {
            new:true,
        })
        if(req.query.type){
            if(req.query.type==='change'){
                return res.redirect(`/tasks/bords/${updatedTask.board}`)
            }
        }
        return res.redirect(`/tasks/${updatedTask.id}`)
    }catch(error){
        req.error = error;
        console.log(error)
        return next();
    }
    
})


/* NOTE: / GET Presentational: show route for specefic task */
router.get('/:id',async (req,res,next)=>{
    try{
        const foundTask = await Task.findById(req.params.id).populate('board')
        if(!foundTask){
            throw new Error('No Task Found')
        }
        const context = {
            task: foundTask,
        }
        req.session.url = req.path;
        return res.render('screens/task_screens/show',context)
    }catch(error){
        console.log(error.errorName)
        error.message = `Could not find task id: ${req.params.id}`
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
        return res.redirect(`/boards/${task.board}`)
    }catch(error){
        req.error = error;
        console.log(error);
        return next();
    }
});



module.exports = router;