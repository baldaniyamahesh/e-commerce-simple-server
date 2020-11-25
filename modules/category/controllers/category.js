const { result } = require('lodash');
const categoryservice=require('../categoryServices');
// const category = require('../model/category');

const categorycontrolls={}


  categorycontrolls.addnewcategory=(req,res)=>{
        categoryservice.addcategory(req)
        .then((result)=>{
            console.log('CATEGORY ADD =====>',result);
            return res.send(result);
        })
        .catch((err)=>{
            return res.status(404)
                       .json({err:"category not added try again"})
        })
  }

  categorycontrolls.getallcategory=(req,res)=>{
      categoryservice.getlistOfcategory(req)
        .then((result)=>{
            return res.send(result);
        })
        .catch((err)=>{
            return res.status(404)
                      .json({"message":"list Not Found Check Agian",err:err});
        })
  }

categorycontrolls.deleteonecategory=(req,res)=>{
    categoryservice.deletecategory(req)
     .then((result)=>{
         return res.send(result)
     })
     .catch((err)=>{
         return res.status(202)
                    .json({"message":"some thing rong check again"})
     })
}


module.exports=categorycontrolls;