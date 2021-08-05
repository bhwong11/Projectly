/* SECTION: Modules */
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const {User} = require('../models');

/* SECTION: Middleware */
function fieldCheck(req, res, next) {
    for(key in req.body){
        if(!req.body[key]){
            //check which route sent the request; login or register
            if(req.session.url === "/login"){
                return res.render("auth/login", {err: "Error logging in"});
            } else if(req.session.url === "/register"){
                return res.render("auth/register", {err: "Error registering"});
            } 
        }
    }
    return next();
}

/* SECTION: routes */
router.get('/register',(req,res,next)=>{
    //set current url
    req.session.url = req.path;
    //return res.send('register page')
    res.render('auth/register', {err: null});
})

router.post('/register', fieldCheck, async (req,res,next)=>{
    try{
        //if user exist
        const foundUser = await User.exists({$or:[{email:req.body.email},{username:req.body.username}]})
        if(foundUser){
            console.log('User already exist');
            return res.render("auth/register", {err: "User already exists"});
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
    //set current url
    req.session.url = req.path;
    //return the page
   return res.render('auth/login', {err: null});
});

router.post('/login', fieldCheck, async(req,res,next)=>{
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
            //return res.redirect("/register")
            return res.render("auth/login", {err: "invalid user info"});
        }

        req.session.currentUser = {
            id: foundUser._id,
            username: foundUser.username,
            email: foundUser.email,
        }
        //console.log(req.session.currentUser)

        return res.redirect('/boards');

    }catch(error){
        console.log(error.message);
        return res.send(error.message)

    }
})

router.get('/logout',async(req,res,next)=>{
    try{
        await req.session.destroy();
        return res.redirect('/login')
    }catch(error){
        console.log(error.message);
        return res.send(error.message)
    }
})

/* SECTION: export the router */
module.exports = router;