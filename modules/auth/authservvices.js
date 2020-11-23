const usermodel=require('../auth/model/auth')
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const mongoose=require('mongoose');
const authcontroll = require('./controlls/auth');

const authServices={}

// sign up user services 

authServices.usersignup = (req) => {
	return new Promise((resolve, reject) => {
		// CHECK FOR DUPLICATE EMAIL :-
		authServices.checkForDuplicateEmail(req)
		.then(response => {
			console.log(req.body);
			let employee = new usermodel(req.body);
			employee.save((err, savedUser) => {
				if(err){
					reject(err);
				}else{
					resolve(savedUser);
				}
			});
		})
		.catch(error => {
			reject(error)
		});
	});
}



// auth user services login  
authServices.usersignin=(req)=>{
    return new Promise((resolve,reject)=>{
       usermodel.findOne({email:req.body.email,password:req.body.password})
       .exec((err,foundUser)=>{
           if(err){
               reject(err)
           }
           else if (foundUser==null){
                 resolve({
                     "message":'No USER FOUND',
                     "statusCode":404,
                 });
           }
           else{
            //    resolve(foundUser);
              const token = jwt.sign(
                { userId: usermodel._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' });
     
               resolve({
                  token:token, 
                  user:{
                      "_id":foundUser._id,
                      "name":foundUser.name,
                      "email":foundUser.email,
                      "role":foundUser.role
                  }            
               });
           }
       })        

    }) 
}

//////////////////////////////email validation check

authServices.checkForDuplicateEmail=(req)=>{
    return new Promise((resolve, reject) => {
		usermodel.findOne({email: req.body.email})
		.exec((err, foundUser) => {
			if(err){
				reject(err);
			}
			else if(foundUser == null){
				resolve({
					"message": "No user found",
					"statusCode": 404
				});
			}
			else{
				reject({"message :": "User with same email already exists	"});
			}
		});
	});
}

module.exports=authServices;