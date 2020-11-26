// const { reject } = require('lodash');
const usermodel=require('../auth/model/auth');
const mongoose=require('mongoose');
const custServices={}

  custServices.getOneUser=(req)=>{
          return new Promise((resolve,reject)=>{
               console.log("hello check this",req.params.userId);
              usermodel.findById(req.params.userId)
              
              .exec((err,founduser)=>{
                  if(err){
                    if(req.params.userId==undefined || req.params.userId==null)  {
                   
                      reject({"message":"user id is empty"})   
                    }  
                  else
                    {                 
                    reject({"message":"USER ARE NOT FOUND"});
                    }
                 
                    }
                  else{
                      
                    resolve ({
                          "message":"get User Successfully",
                          "user":founduser
                      })
                  }
              })
          })
  }

  custServices.updateuser=(req)=>{
    return new Promise((resolve,reject)=>{
        //   object check value not null and update  
           var objuser={}

           if(req.body.name)objuser.name=req.body.name;  
           if(req.body.email)objuser.email=req.body.email;
           if(req.body.about)objuser.about=req.body.about;
              
            //   objuser={$set:objuser}
            //    console.objuser('update user object',objuser);
        console.log("updated user id",req.params.userId+"updateuser body");
        usermodel.findByIdAndUpdate(req.params.userId, {
                 $set:objuser
            }, {new: true})
               .exec((err,user)=>{
                   if(err){
                       reject({"message":"Error updating with this id"+req.params.userId})
                   }
                   else
                   {
                       resolve({"message":"user updated sucessfully","user":user})
                   }
               })

      })
  }

   custServices.userlist=(req)=>{
    //    console.log('user list promise work')

    return new Promise((resolve,reject)=>{
        usermodel.find()
        .exec((err,users)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(users);
            }
        })


    })
   }

 module.exports=custServices;   