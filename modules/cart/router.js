const express=require('express');
const cartcontrollers=require('./controllers/cart')

const router=express.Router();
router.get('/product/cart/list',cartcontrollers.cartlist);
router.post('/product/addtocart', cartcontrollers.cartservices);
router.delete('/cartclear/:cartId/',cartcontrollers.clearusercart)


module.exports=router;
