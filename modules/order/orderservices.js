const { reject } = require('lodash');
const mongose=require('mongoose');

const productmodel=require('../products/model/products');
const cartmodel=require('./model/order')
const order=require('./model/order');


const orderServices={}


orderServices.createorder=(req)=>{
    productmodel.findById(req.params.productId)
    // .exec((err))
}

orderServices.addtocart=(req)=>{
    return new Promise((resolve,reject)=>{
        let cart=new cartmodel({
            product:req.body.product,
            price:req.body.price,
            count:req.body.count
        });
    //    cart.save()
        cart.save((err,foundcart)=>{
          if(err){
              reject(err)
          }
         else if(foundcart==null)
         {
            reject({"message":"check your cart something wrong"})
         }
         else{
             console.log('found cart work or not')
             resolve(foundcart);
         }
                
        })


    })
    // let cart={}
         
    //    let cart=new Cartitem(req.body);
    //     cart.save(())   
}

module.exports=orderServices;