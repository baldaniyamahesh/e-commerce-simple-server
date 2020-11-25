const productServices = require('../productServices');
const { result } = require('lodash');
// const productServices = require('../productServices');
// const productservices=require('../productServices');

const productcontroll={}

 productcontroll.addoneproduct=(req,res)=>{
     console.log('check product',req.param.userId)
         productServices.addproduct(req)
          .then((result)=>{
             return res.send(result)
         })
         .catch((err)=>{
             return res.send(err)
         })

 }

 productcontroll.allproduct=(req,res)=>{
    //   console.log('product response',)
     productServices.listallproduct(req)
     
     .then((result)=>{
         return res.send(result)
     })
     .catch((err)=>{
         return res.send(err)
     })
 }
 module.exports=productcontroll;
