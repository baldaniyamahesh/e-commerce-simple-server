const { response } = require('express');
const { result } = require('lodash');
const custServices = require('../userservices');
const userModel=require('../../auth/model/auth')
// const custservices=require('../userservices');

  const usercontroller={}

  usercontroller.findUserById=(req, res) => {
  
    custServices
        .getOneUser(req)
        .then((result) => {
            return res.send(result);
        })
        .catch((err) => {
            return res
                .status(400)
                .json(err);
        });
},
usercontroller.updateduserdata=(req,res)=>{
      

  custServices
  .updateuser(req)
  .then((result) => {
      return res.send(result);
  })
  .catch((err) => {
      return res
          .status(400)
          .json(err);
  });

}

usercontroller.alluserlist=(req,res)=>{
   custServices
   .userlist(req)
   .then((result)=>{
     console.log("Users List response==>",result)
     return res.send(result);
   })
   .catch((err)=>{
     return res.send(err);
   })
}
  
  module.exports=usercontroller;