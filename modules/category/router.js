const express=require('express');
// const categorycontrolls = require('../category/controllers/category');
const categorycontroll=require('../category/controllers/category')

const router=express.Router();

router.post('/product/addcategory/:userId',categorycontroll.addnewcategory);
router.get('/product/listcategory',categorycontroll.getallcategory);
router.delete('/product/category/:categoryId/:userId',categorycontroll.deleteonecategory);

module.exports=router;