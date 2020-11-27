const express=require('express');
const ordercontroll = require('./controllers/order');


const router=express.Router()

router.get('/product/order-list/:userId',ordercontroll.orderlist);
router.get('/orderstatuslist',ordercontroll.liststatusorder);
router.get('/orders/:orderId',ordercontroll.findorderbyId);
router.post('/product/createOrder/:userId',ordercontroll.createtoOrder);
router.put('/orderstatus/:orderId/:userId',ordercontroll.updatedstatus);

module.exports=router;