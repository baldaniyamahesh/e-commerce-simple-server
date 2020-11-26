const orderServices=require('../orderservices');

const ordercontroll={}


 ordercontroll.addtocartitem=(req,res)=>{
       orderServices.addtocart(req)
       .then((result)=>{
           console.log("check add to response==>",result);
           return res.send(result)
       })
       .catch((err)=>{
           return res.send(err)
       })
 }

 module.exports=ordercontroll;

