/* SECTION: external modules */
const express = require("express");
const router = express.Router();


/* SECTION: internal modules */
const { Board, Task } = require("../models/index");


/* SECTION: Middleware */
const formFieldRedirect = (req,res,next)=>{
    for(let key in req.body){
        if(!req.body[key]){
            req.session.error = `Please enter a ${key}`
            console.log(req.session.url)
            if(req.session.url==='/boards/new'){
                return res.redirect('/boards/new')
            }else if(req.session.url==='/boards'){
                return res.redirect('/boards')
            }else if(req.session.url===`/boards/${req.params.id}/edit`){
                return res.redirect(`/boards/${req.params.id}/edit`)
            }
            
        }
    }
    next()
}

/* SECTION: Routes */

/* NOTE: /boards GET Presentational: Our main workspace page */
router.get("/", async (req, res, next) => {
    try{
        //grab all the boards from the DB with the user ID of the current user
        const boards = await Board.find({userId: req.session.currentUser.id});
        //create the context containing the boards
        const context = { 
            boards,
            error: req.session.error || null,
         }
        //set current url
        req.session.url = req.path;
        //reset error
        req.session.error = null
        //send the boards to the view
        return res.render("../views/screens/userWorkspace", context);
    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

/* NOTE: /boards/new GET Presentational: Creating a new board */
router.get("/new", (req, res, next) => {
    const context = {
        error:req.session.error || null,
    }
    req.session.error = null,
    req.session.url = req.path;
    res.render("screens/boards_screens/newBoard.ejs",context)
});

/* NOTE: /boards POST Functional: Posting a new board to our database */
router.post("/", formFieldRedirect,async (req, res, next) => {
    try {
        //make a new board object
        const board = {
            ...req.body,
            userId: req.session.currentUser.id,
        }

        //create a new board from the board object
        const createdBoard = await Board.create(board);

        //return to boards page
        return res.redirect("/boards");

    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
});

/* NOTE: /boards/:id GET Presentational: Shows the board page containing all the tasks */
router.get("/:id", async (req, res, next) => {
    try {
        const foundBoard = await Board.findById(req.params.id);
        if(!foundBoard){
            throw new Error('No Task Found')
        }
        const foundTasks = await Task.find({ board: req.params.id });

        const context = {
            board: foundBoard,
            tasks: foundTasks,
            error: req.session.error || null,
        }
        req.session.error = null;
        req.session.url = req.path;
        return res.render("screens/boards_screens/index", context);
    } catch(error) {
        console.log(error);
        error.message = `Could not find board id: ${req.params.id}`
        req.error = error;
        return next();
    }
});

/* NOTE: /boards/:id/edit GET Functional: A form to edit a board name */
router.get("/:id/edit", async (req, res, next) => {
    try {
        const foundBoard = await Board.findById(req.params.id);
        if(!foundBoard){
            throw new Error('No Task Found')
        }

        const context = {
            board: foundBoard,
            error:req.session.error || null,
        }
        req.session.error = null;
        req.session.url = req.path;
        return res.render("screens/boards_screens/editBoard", context);
    } catch(error) {
        error.message = `Could not find board id: ${req.params.id}`
        console.log(error);
        req.error = error;
        return next();
    }
});

/* NOTE: /boards/:id PUT Functional: Edits the board content in our database */
router.put("/:id",formFieldRedirect, async (req, res, next) => {
    try{
        const updatedBoard = await Board.findByIdAndUpdate(
            req.params.id, 
            {
                $set: req.body,
            }, 
            {
                new: true,
            }
        );
        return res.redirect(`/boards/${updatedBoard.id}`)
    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
    
});

/* NOTE: /boards/:id DELETE Functional: deletes a board from our database */
router.delete("/:id", async (req, res, next) => {
    try {
        //find and delete the board and associated tasks
        const deletedBoard = await Board.findByIdAndDelete(req.params.id);
        const deletedTasks = await Task.deleteMany({ board: req.params.id });

        //redirect the user back to their main workspace
        return res.redirect("/boards");
    } catch(error) {
        console.log(error);
        req.error = error;
        return next();
    }
})

/* SECTION: Export routes */
module.exports = router;