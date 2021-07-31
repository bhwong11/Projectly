const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User} = require('../models');

router.get('/register',(req,res,next)=>{
    //return res.send('register page')
    res.render('auth/register');
})

router.post('/register',async (req,res,next)=>{
    try{
        //if user exist
        const foundUser = await User.exists({$or:[{email:req.body.email},{username:req.body.username}]})
        if(foundUser){
            console.log('User already exist')
            return res.send('user already exist');
        }

        //if user does not exist
            //hash and salt password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        req.body.password = hash;
            //create user with hashed password
        const createdUser = await User.create(req.body);

        //return to login
        return res.redirect('/login')
        //test route below
        //res.send(createdUser)

    }catch(error){
        console.log(error.message)
        return res.send(error.message)
    }
})

router.get('/login',(req,res,next)=>{
   return res.render('auth/login')
})

router.post('/login',async(req,res,next)=>{
    try{
        //check if user exist
        const foundUser = await User.findOne({username: req.body.username});
        if(!foundUser){
            console.log(`user does not exist`)
            return res.redirect('/register')
        }
        //check password
        const matchedPassword = await bcrypt.compare(req.body.password,foundUser.password)
        if(!matchedPassword){
            return res.send('invalid password')
        }

        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
        }
<<<<<<< HEAD
        //console.log(req.session.currentUser)

        return res.redirect('/boards');
=======
        console.log(req.session.currentUser)
        console.log('logged in')
        return res.redirect('/boards')
>>>>>>> 0d14d9d81c1ec9472f7c7a2f63c24f578e7281ed

    }catch(error){
        console.log(error.message);
        return res.send(error.message)

    }
})

router.get('logout',async(req,res,next)=>{
    try{
        await req.session.destroy();
        return res.redirect('/login')
    }catch{
        console.log(error.message);
        return res.send(error.message)
    }
})


module.exports = router;