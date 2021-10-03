/* SECTION: require modules */
const mongoose = require("mongoose");

/* SECTION: Make a schema */
const boardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter a board name"]
    },
    userId: [{
        type: mongoose.Types.ObjectId,
        ref: "User"
    }]
}, {timestamps: true});

/* SECTION: Make a model */
const Board = mongoose.model("Board", boardSchema);

/* SECTION: export the model */
module.exports = Board;