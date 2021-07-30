/* SECTION: external modules */
const express = require("express");
const router = express.Router();


/* SECTION: internal modules */
const { Board } = require("../models/index");


/* SECTION: Routes */

/* NOTE: /boards GET Presentational: Our main workspace page */
router.get("/", (req, res, next) => {
    res.send("Hello from the boards (main workspace) page!");
});

/* NOTE: /boards/new GET Presentational: Creating a new board */
router.get("/new", (req, res, next) => {
    res.send("This is a form to show a form to create a new board");
});

/* NOTE: /boards POST Functional: Posting a new board to our database */

/* NOTE: /boards/:id GET Presentational: Shows the board page containing all the tasks */
router.get("/:id", (req, res, next) => {
    res.send(`This page displays the list of tasks in a board, id: ${req.params.id}`);
});

/* NOTE: /boards/:id/edit GET Functional: A form to edit a board name */
router.get("/:id/edit", (req, res, next) => {
    res.send(`This page displays the form to edit a board with id ${req.params.id}`);
});

/* NOTE: /boards/:id POST Functional: Edits the board content in our database */

/* NOTE: /boards/:id DELETE Functional: deletes a board from our database */


/* SECTION: Export routes */
module.exports = router;