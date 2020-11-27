const { result } = require('lodash');
const orderServices=require('../orderservices');

const ordercontroll={}


 ordercontroll.createtoOrder=(req,res)=>{
       orderServices.createorder(req)
       .then((result)=>{
           console.log(result);
            return res.send(result)
       })
       .catch((err)=>{
            return res.send(err)
       })
 }

 ordercontroll.orderlist=(req,res)=>{
     orderServices.orderlist(req)
     .then((result)=>{
         console.log("user list display====>",result)
      return res.send(result)
    
        })
     .catch((err)=>{
     return res.send(err)
     })
 }
 
 ordercontroll.updatedstatus=(req,res)=>{
     orderServices.orderstatusupdate(req)
     .then((result)=>{
         console.log("sucess status work")
         return res.send(result)
     })
     .catch((err)=>{
         console.log("status fail wokr")
         return res.send(err)
     })
 }

 ordercontroll.liststatusorder=(req,res)=>{
      orderServices.orderstatuslist(req)
      .then((result)=>{
          console.log('status list',result);
          return res.send(result)
      })
       .catch((err)=>{
           return res.send(err)
       })
 }

 ordercontroll.findorderbyId=(req,res)=>{
     orderServices.getsingleorderbyId(req)
     .then((result)=>{
          console.log("found order by id response=========>",result)
         return res.send(result)
        })
     .catch((err)=>{
        return res.send(err)
     })
 }
 module.exports=ordercontroll;

