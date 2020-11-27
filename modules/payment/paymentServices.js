const { reject, result } = require('lodash')
const usermodel=require('./../auth/model/auth')


let gateway = brainTree.connect({environment: brainTree.Environment.Sandbox, publicKey: process.env.BRAINTREE_PUBLIC_KEY, privateKey: process.env.BRAINTREE_PRIVATE_KEY, merchantId: process.env.BRAINTREE_MERCHANT_ID});


const paymentServices={}
 
 paymentServices.getclientoken=(req)=>{
   return new Promise((resolve,reject)=>{
   paymentServices.serhaveaccount_checker(req)
   .then((result)=>{

   
    gateway
    .clientToken
    .generate({}, function (err, response) {
        if (err) {
             reject(err)
        } else {
            resolve(response);
            // return res.json(response);
        }
    })
})
///////////////////////////////////////////
.catch((err)=>{
    reject({status:401,"message":"you are not authatcate for for token"})
})   
})

 }




 paymentServices.serhaveaccount_checker=(req)=>{
     return new Promise((resolve,reject)=>{
     usermodel.findById(req.params.userId)
     .exec((err,founduser)=>{
         if(err){
             reject(err)
         }
         else if(founduser==null){
             reject({status:404,"message":"user Are not found please check Id"})
         }
         else {
             resolve(founduser)
         }
     })
    })

}

module.exports=paymentServices;