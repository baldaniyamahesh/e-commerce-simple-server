const { reject, add, result } = require('lodash');
const mongose=require('mongoose');
const usermodel=require('../auth/model/auth')

const productmodel=require('../products/model/products');
// const cartmodel=require('./model/order')
const ordermodel=require('./model/order');


const orderServices={}


orderServices.createorder=(req)=>{
    return new Promise((resolve,reject)=>{
        // console.log()   
        if(!req.body.cart || !req.body.amount || !req.body.address || !req.body.status || !req.body.user){
                reject({status:400,"message":"Some Field Are Empty Check And Eneter Value"})
           }
         
            orderServices.dupliorder(req)
             .then((result)=>{
         

            orderServices.userhaveaccount(req)
            .then((result)=>{
          
           let order=new ordermodel(req.body);
              order.save((err,order)=>{
                  if(err){
                      reject(err)
                  }
                  else if(order==null){
                      reject({status:400,"message":"some havong issue reason not create order"})
                  }
                  else{
                      resolve(order)
                  }
              })

            })
            .catch((err)=>{
                reject({status:401,"message":"you have no account Please First Need Signup"})
            })
            // duplicate order then 
        })
        //////////////////
        .catch((err)=>{
            reject ({status:402,"message":"you have alredy order this item"});
        })
    })
    // .catch((err)=>{
    //     reject({status:404,"message":"you have order alredy created"})
    // })
    // productmodel.findById(req.params.productId)
    // .exec((err))

}


//////////////////////////////////////order list////////////////////////////////////////////////////
orderServices.orderlist=(req)=>{
    return new Promise((resolve,reject)=>{
         orderServices.userauthorization(req).
        then((result)=>{  
        ordermodel.find()
          .exec((err,foundorder)=>{
              if(err){
                  reject(err)
              }
              else if(foundorder==null){
                  reject({status:404,"message":"order are Not Found"})
              }
              else {
                  resolve(foundorder)
              }
          })

        })
        .catch((err)=>{
            reject({status:401,"message":"you have no authorize"});
        })
    })
}


orderServices.orderstatusupdate=(req)=>{
    return new Promise((resolve,reject)=>{
        //   console.log("statusvalue check",req.body.status);
          orderServices.userauthorization(req)
          .then((result)=>{      
           let status=req.body.status;
           ordermodel.findByIdAndUpdate(req.params.orderId,{$set:{status:status}})
           .then((result)=>{
                // console.log("pass result controller",result);

               resolve({status:200,"message":"status updated order sucessfully","order":result})
           })
           .catch((err)=>{
               reject(err)
           })
        //    end of authorazation 
        }) 
        .catch((err)=>{
            reject({status:401,"message":"you are not authorize for updated status"})
        })

    })
}


orderServices.userhaveaccount=(req)=>{
    return new Promise((resolve,reject)=>{
        usermodel.findById(req.params.userId)
         .then((result)=>{
             resolve(result)
         })
         .catch((err)=>{
             reject(err)
         })
 
   })
 
}

orderServices.dupliorder=(req)=>{
    return new Promise((resolve,reject)=>{
        ordermodel.findOne({cart:req.body.cart})
        .then((result)=>{
            console.log("hello find order========>",result);
            reject(result)
        })
        .catch((err)=>{
              resolve(err)
        })
    })
}

 orderServices.userauthorization=(req)=>{
    return new Promise((resolve,reject)=>{
        console.log('found user check for status',);
         
        usermodel.findById(req.params.userId)
          
        .exec((err,founduser)=>{
            if(err){
                reject(err)
                // console.log("you are unelagible");
            }
            else if(founduser.role > 0){
                resolve(founduser)
                console.log("you are elgible for create category")

            }
            else{
                // console.log("not found ");
                reject({"message":"YOU ARE NOT ELAGIBLE FOR CATEGORY CREATE"})
            }
        })
    })
}

orderServices.orderstatuslist=(req)=>{
    return new Promise((resolve,reject)=>{
        resolve(ordermodel.schema.path("status").enumValues)
        // ;      
    })
        
}

orderServices.getsingleorderbyId=(req)=>{
    return new Promise((resolve,reject)=>{
         ordermodel.findById(req.params.orderId)
         .exec((err,data)=>{
             if(err){
                 reject(err)
             }
             else if(data==null){
                 reject({status:404,"message":"Id Are Not Valid Check Agian"})
             }
             else {
                 resolve({status:200,"message":"get data sucessfully","order":data})
             }
         })
    })
}



module.exports=orderServices;