/* SECTION: External modules */
const mongoose = require("mongoose");

/* SECTION: User schema */
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please create a user name"]
    },
    email: {
        type: String,
        required: [true, "Please add your email"]
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    }, 
    boards:[{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Board"
    }],
}, { timestamps: true });

/* SECTION: Create model */
const User = mongoose.model("User", userSchema);

/* SECTION: Export model */
module.exports = User;