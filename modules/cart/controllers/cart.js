const { result } = require('lodash');
const cartservices=require('../../cart/cartservices');


const cartcontroll={}


cartcontroll.cartservices=(req,res)=>{
    // console.log("check response",req.body.item);
    cartservices.addtocart(req)
    .then((result)=>{
        return res.send(result)
    })
    .catch((err)=>{
        return res.send(err)
    })
}


cartcontroll.cartlist=(req,res)=>{
    cartservices.getcartlist(req)
    .then((result)=>{
        console.log("get response of cart======>",result)
        return res.send(result);
    })
    .catch((err)=>{
        return res.send(err);
    })
}

cartcontroll.clearusercart=(req,res)=>{
    cartservices.usercartclear(req)
    .then((result)=>{
        return res.send(result)
    })
    .catch((err)=>{
        return res.send(err)
    })
}
module.exports=cartcontroll;
