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


 productcontroll.deleteoneproduct=(req,res)=>{
     productServices.deleteoneproduct(req)
      .then((result)=>{
          return res.send(result)
      })
      .catch((err)=>{
          return res.send(err)
      })
 }

 productcontroll.updateoneproduct=(req,res)=>{
     productServices.updatedproduct(req)
     .then((result)=>{
         return res.send(result)
     })
     .catch((err)=>{
         return res.send(err)
     })
 }
 
 productcontroll.getoneproduct=(req,res)=>{
     productServices.findsingleproduct(req)
     .then((result)=>{
         console.log("get single product list response====>",result)
         return res.send(result)
     })
     .catch((err)=>{
         return res.send(err)
     })
 }
 
 module.exports=productcontroll;
