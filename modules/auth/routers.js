const express=require('express');
const authcontroll=require('../auth/controlls/auth')
const usersignupvalidation=require('../../validator/usersignup')
const router=express.Router();

router.post('/signup',authcontroll.usersignup,usersignupvalidation.userSignUpValidator);
router.post('/signin',authcontroll.usersignin,authcontroll.isAuth)
router.get('/signout',authcontroll.signout)

module.exports=router;
