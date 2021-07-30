/* SECTION: External modules */
const mongoose = require("mongoose");

/* SECTION: User schema */
const userSchema = new mongoose.Schema({
    userName: {
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
}, { timestamps: true });

/* SECTION: Create model */
const User = mongoose.model("User", userSchema);

/* SECTION: Export model */
module.exports = User;