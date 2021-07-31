/* SECTION: External modules */
const mongoose = require('mongoose');

/* SECTION: Task schema */
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please Enter Task Name'],
    },
    content:{
        type: String,
        required: [true,'Please Enter Task Information'],
    },
    dueDate:{
        type:Date,
        required:[true,'Please Enter Due Date For Task']
    },
    board:{
        type: mongoose.Types.ObjectId,
        ref:"Board",
    }
},{
    timestamps: true,
})

/* SECTION: Create model */
const Task = mongoose.model('Task',taskSchema);

/* SECTION: Export model */
module.exports = Task;