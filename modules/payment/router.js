const express=require('express');
// const paymentServices=require('./paymentServices')
const { route } = require('../cart/router');
const paymentServices = require('./paymentServices');

const router=express.Router();

router.get('/payment/gettoken/',paymentServices.getclientoken);

module.exports=router;