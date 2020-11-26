// const productmodel=require('../products/model/products');
const _ =require('lodash')
const productsmodel = require('./model/products');
const usermodel=require('../auth/model/auth');
const { reject, result } = require('lodash');
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

// updated product  
productServices.updatedproduct=(req)=>{
    return new Promise((resolve,reject)=>{
    //    console.log('check file path',req.file.path);
       productServices.userauthorization(req)
       .then((result)=>{ 
       var Objproduct={}
        if(req.body.name)Objproduct.name=req.body.name;  
        if(req.body.price)Objproduct.price=req.body.price;
        if(req.body.discription)Objproduct.discription=req.body.discription;
        if(req.body.category)Objproduct.category=req.body.category;
        if(req.body.sold)Objproduct.sold=req.body.sold;
        if(req.body.quatity)Objproduct.quatity=req.body.quatity;
        if(req.body.shipping)Objproduct.shipping=req.body.shipping;
        // if(req.body.photo)Objproduct.photo=req.body.photo;
        if(req.body.shipping)Objproduct.shipping=req.body.shipping;

           
           Objproduct={$set:Objproduct}
            console.log('update user object',Objproduct);
         
     console.log("updated user id",req.params.productId+"updateuser body"+req.body);
        // if(Objproduct.req.name)

        productsmodel.findByIdAndUpdate(req.params.productId,Objproduct,{
            new:true
        })
        .exec((err,updatedProduct)=>{
            console.log('update product response',updatedProduct);

            if(err){
                reject(err)
            }
            else if(updatedProduct==null){
                reject({status:400,"message":"Bad Response Check Value And parameters"})
            }
            else{
                resolve({status:200,"message":"product Update Successfully","product":updatedProduct})
            }
        })

    })
.catch((err)=>{
    reject({status:401,"message":"You Are Not Elagible For Update Product"})
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

productServices.findsingleproduct=(req)=>{
    return new Promise((resolve,reject)=>{
        productsmodel.findById(req.params.productId)
        .exec((err,foundproduct)=>{
            if(err){
                reject(err)
            }
            else if(foundproduct==null){
                reject({status:404,"message":"product not Found Check Id"})
            }
            else{
                resolve({status:200,"message":"product get sucessfully","product":foundproduct})
            }
        })
    })
}


productServices.deleteoneproduct=(req)=>{
    return new Promise((resolve,reject)=>{
        productServices.userauthorization(req)
        .then((result)=>{
        productsmodel.findByIdAndDelete(req.params.productId)
        .exec((err,foundproduct)=>{
            if(err){
                reject(err)
            }
            else if(foundproduct==null)
            {
                resolve({"message":"product Not Found Please Check Id"})
            }
            else
            {
                resolve({"message":"Product Sucessfully Deleted"+req.params.productId})
            }
        })
    }).catch((err)=>{
        reject({"message":"you Are Not Authorize For Product Delete Contact Admin"})
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