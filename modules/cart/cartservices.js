const e = require('express');
const { response } = require('express');
const { reject, result } = require('lodash');
const productcontroll = require('../products/controllers/products');
const products = require('../products/model/products');
const cartmodel=require('./model/cart');

const cartServices={}


cartServices.addtocart=(req)=>{
 return new Promise((resolve,reject)=>{
     if(!req.body.user_id){
           reject({status:404,"message":"User I Required"})
     }
    cartServices.findusercart(req)
    .then((result)=>{
        console.log('push the id sucessfully')
    })
    .catch((err)=>{
         console.log("create new object cart");
   
    let cartitem=new cartmodel(req.body)
      cartitem.save((err,additem)=>{
          if(err){
              reject(err)
          }
          else if(additem==null){
              reject({status:404,"message":"cart item not Found"})
          }
          else
          {
              resolve({"message":"add item succesfully","cart": additem})
          }
      })
        })
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


cartServices.usercartclear=(req)=>{
    return new Promise((reject,resolve)=>{
        console.log('hello',req.params.cartId)
        cartmodel.findOneAndDelete({_id:req.params.cartId})
        .exec((err,response)=>{
            if(err){
                reject(err)
            }
           else if (response==null){
               reject({
                   status:404,
                   "message":"user id not found please check"
               })
           }
           else{
               resolve(response)
           }
        })
    })
}

cartServices.findusercart=(req)=>{
    console.log('hello',req.body.user_id);
    return new Promise((resolve,reject)=>{
        cartmodel.findOne({user_id:req.body.user_id}).then((cart)=>{
            // resolve(result)
        // // cartmodel.findOne({product_id:req.body.product_id}).exec((err,foundid)=>{
         let item=req.body.item;      
        console.log("hey check item",item);

        cartmodel.findOneAndUpdate({_id:cart._id},{$addToSet: {item: {$each: item}}},{useFindAndModify:false})
        .then((result)=>{
            resolve(result)
        })
        .catch((err)=>{
            reject(err)
        })
        // cartmodel.findByIdAndUpdate()               
    }).catch((err)=>{
        reject(err)
    })
}) 

}

module.exports=cartServices;