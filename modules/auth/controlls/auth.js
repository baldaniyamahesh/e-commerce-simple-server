const  authServices=require('../authservvices')
const usermodel=require('../model/auth');
// const {errorHandler} = require('../../helpers/dbErrorHandler');
const jwt=require('jsonwebtoken');
const expressjwt=require('express-jwt');
// const validator=require('../../valid')
// const validator = require('../../helpers/encryption');

const authcontroll={}
   authcontroll.usersignup = (req, res)=>{
        console.log("USER SIGNUP SUCCESSFULLY", req.files, req.body)
        authServices.usersignup(req).then(response => {
            console.log("resposne ===============+>", response);
            return res.send(response);
        })
        .catch(err =>{
            console.log( "err" ,err);
            return res.send(err);
        });
    }
    
 authcontroll.usersignin=(req,res)=>{
    console.log("USER SIGNIN SUCCESSFULLY", req.files, req.body)
    authServices.usersignin(req).then(response => {
        console.log("resposne ===============+>", response);
        return res.send(response);
    })
    .catch(err =>{
        console.log( "err" ,err);
        return res.send(err);
    });
 }


 authcontroll.signout=(req, res) => {
     console.log(req);
    res.clearCookie('token');
    res
        .status(200)
        .json({message: "Signout Successfull"});
} 


// requireSignin: expressJwt({secret: process.env.JWT_SECRET, userProperty: 'auth'}),
     
authcontroll.isAuth=(req, res, next) => {
    let user = req.profile && req.auth && req.profile._id == req.auth.user.id;
    // console.log('USER ARE DISPLAY AUTH',user);
    if (!user) {
        return res
            .status(403)
            .json({error: 'Access Denied'});
            // console.log('authenticate work redy');
    }
    next();
    // console.log('is auth work');
},
module.exports=authcontroll;