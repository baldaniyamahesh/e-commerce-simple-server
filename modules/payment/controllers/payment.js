const { result } = require('lodash');
const usermodel=require('../../auth/model/auth');
const paymentServices=require('../paymentServices');
require('dotenv').config()
const paymentcontroll={}


  paymentcontroll,gettokenpayment=(req,res)=>{
      paymentServices.getclientoken(req)
      .then((result)=>{
          return res.send(result)
      })
      .catch((err)=>{
          return res.send(err);
      })
        
  }

