const { reject, result } = require('lodash')
const usermodel=require('./../auth/model/auth')
const stripe=require('stripe');

// let gateway = brainTree.connect({environment: brainTree.Environment.Sandbox, publicKey: process.env.BRAINTREE_PUBLIC_KEY, privateKey: process.env.BRAINTREE_PRIVATE_KEY, merchantId: process.env.BRAINTREE_MERCHANT_ID});


const paymentServices={}
 
 paymentServices.getclientoken=(req)=>{
   return new Promise((resolve,reject)=>{
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Gourav Hammad', 
        address: { 
            line1: 'TC 9/4 Old MES colony', 
            postal_code: '452331', 
            city: 'Indore', 
            state: 'Madhya Pradesh', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 
  
        return stripe.charges.create({ 
            amount: 2500,     // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'INR', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => {
        resolve({message:"sucesss"}) 
        // res.send("Success")  // If no error occurs 
    }) 
    .catch((err) => { 
        // res.send(err)  
             // If some error occurs 
        reject(err)
      });


//    paymentServices.serhaveaccount_checker(req)
//    .then((result)=>{
//     stripe.customers.create({ 
//         email: req.body.stripeEmail, 
//         source: req.body.stripeToken, 
//         name: req.body.name, 
//         address:req.body.address
//     }) 
//     .then((customer) => { 
  
          
//         return stripe.charges.create({ 
//             amount: req.body.amount,     // Charing Rs 25 
//             description: 'you sucessfully buy Product', 
//             currency: 'INR', 
//             customer: req.body.user_id 
//         }); 
//     }) 
//     .then((charge) => { 
//          resolve({"message":"your payment sucessfully"})
//         // res.send("Success")  // If no error occurs 
//     }) 
//     .catch((err) => { 
//         res.send({"message":"your payment having issue please check details"})       // If some error occurs 
//     });
// })
// ///////////////////////////////////////////
// .catch((err)=>{
//     reject({status:401,"message":"you are not authorize for payment check account contact admin"})
// })   
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