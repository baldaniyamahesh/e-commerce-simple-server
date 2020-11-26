const e = require('express');
const { response } = require('express');
const { reject, result } = require('lodash');
const productcontroll = require('../products/controllers/products');
const products = require('../products/model/products');
const cartmodel=require('./model/cart');

const cartServices={}


cartServices.addtocart=(req)=>{
 return new Promise((resolve,reject)=>{
     if(!req.body.user_id || !req.body.product_id || !req.body.quantity){
           reject({status:404,"message":"All field are required try again"})
     }
    cartServices.findusercart(req)
    .then((result)=>{
        console.log('push the id sucessfully')
    })
    .catch((err)=>{
         console.log("create new object cart");
    })
    // let cartitem=new cartmodel(req.body)
    //   cartitem.save((err,additem)=>{
    //       if(err){
    //           reject(err)
    //       }
    //       else if(additem==null){
    //           reject({status:404,"message":"cart item not Found"})
    //       }
    //       else
    //       {
    //           resolve({"message":"add item succesfully","cart": additem})
    //       }
    //   })
    })
}

cartServices.getcartlist=(req)=>{
    return new Promise((reject,resolve)=>{
        cartmodel.find()
        .exec((err,foundcart)=>{
            if(err){
                reject(err)
            }
            else if(foundcart==null){
                reject({status:404,"message":"cart data not found"})
            }
            else{
                resolve(foundcart)
            }
        })
    })
}

cartServices.findusercart=(req)=>{
    console.log('hello',req.body.user_id);
    return new Promise((resolve,reject)=>{
        cartmodel.findOne({user_id:req.body.user_id}).exec((err,user)=>{
            if(err){
                reject(err)
            }
        // cartmodel.findOne({product_id:req.body.product_id}).exec((err,foundid)=>{
              

        // cartmodel.findByIdAndUpdate({_id:user._id},{$push:{product_id:req.body.product_id}}) 
        //  .exec((err,sucess)=>{
        //      if(err){
        //          reject(err)
        //      }
        //      else if(sucess==null){
        //         //  console.log('some thing rong value null')
        //         reject({satus:404,"message":"You come First Time so First Create Obj"})
        //      }
        //      else{
        //         //  console.log('add sucess')
        //         resolve(sucess)
        //      }
        //  })
    
        // cartmodel.findByIdAndUpdate()               
    })
}) 

}

module.exports=cartServices;