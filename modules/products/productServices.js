// const productmodel=require('../products/model/products');
const _ =require('lodash')
const productsmodel = require('./model/products');
const usermodel=require('../auth/model/auth');
const { reject } = require('lodash');
const { Promise } = require('mongoose');
const productServices={}

productServices.addproduct=(req)=>{
  return new Promise((resolve,reject)=>{
    //  console.log("hello check again product",req.params.userId)
   
      productServices.userauthorization(req)
       .then((result)=>{
        const userObj = {
         
                name:req.body.name,
                discription:req.body.discription,
                price:req.body.price,
                sold:req.body.sold,
                quatity:req.body.quatity,
                category:req.body.category,
                photo:req.file.path,
                shipping:req.body.shipping
        };
        const Product = productsmodel(userObj);
       
        Product.save((err,newproduct)=>{
           console.log('product add or not check')
            if(err){
                reject(err)
            }
            resolve(newproduct)
          console.log(err)
       })
    })
    .catch((err)=>{
        reject({"message":"you are not Authoraze"});
    })
})

}

productServices.listallproduct=(req)=>{
   return new Promise((resolve,reject)=>{
      productsmodel.find()
      .exec((err,listproduct)=>{
          if(err){
              reject(err)
          }
          else if(listproduct==null){
              resolve({"message":"product Not Found retrive Again"})
          }
          else{
              resolve({"message":"Product List Display Sucessfully",product:listproduct})
          }
      })
 })
}

productServices.userauthorization=(req)=>{
    return new Promise((resolve,reject)=>{
        usermodel.findById(req.params.userId)
        .exec((err,founduser)=>{
                 console.log('user found or not check',founduser);
            if(err){
                reject(err)
                // console.log("you are unelagible");
            }
            else if(founduser.role > 0){
                console.log(founduser);
                resolve(founduser)
                // console.log("you are elgible for create category")
                // console.log('found user token find');

            }
            else{
                // console.log("not found ");
                reject({"message":"you are not elagible for create product please contact admin"})
            }
            // reject(err);
        })
    })
}



module.exports=productServices;