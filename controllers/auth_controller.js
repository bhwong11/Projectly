const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User} = require('../models');

router.get('/register',(req,res,next)=>{
    return res.send('register page')
    //res.render('auth/register');
})

router.post('/register',async (req,res,next)=>{
    try{
        //if user exist
        const foundUser = await User.exists({$or:[{email:req.body.email},{username:req.body.username}]})
        if(!foundUser){
            console.log('User already exist')
            return res.redirect('/login');
        }

        //if user does not exist
            //hash and salt password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
            //create user with hashed password
        const createdUser = await User.create(req.body);
        console.log(createdUser)

        //return to login
        return res.redirect('/login')
        res.send(createdUser)

    }catch(error){
        return res.send(error)
    }
})

router.get('/login',(req,res,next)=>{
   return res.render('auth/login')
})




module.exports = router;