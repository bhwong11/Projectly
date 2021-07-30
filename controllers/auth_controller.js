const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User} = require('../models');

router.get('/register',(req,res,next)=>{
    res.send('folder')
})



module.exports = router;