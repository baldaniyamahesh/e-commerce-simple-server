const categorymodel=require('../category/model/category');
const usermodel=require('../auth/model/auth')
const mongoose=require('mongoose');
const { model } = require('../auth/model/auth');
const { response } = require('express');
const { reject, identity } = require('lodash');
// const category = require('../category/model/category');


const categoryServices={}

    // first add category 
  categoryServices.addcategory=(req)=>{
     console.log(req.body)
    return new Promise((resolve,reject)=>{
        // console.log("req params work or not",req.params.userId);
   
         categoryServices.checkForDuplicateCategory(req)
          categoryServices.userauthorization(req.params.userId)
         .then((response)=>{
        let categories=new categorymodel(req.body);    
        categories.save((err,savedCategory)=>{
            // console.log('check new category',newcat);
            if(err){
                reject(err);
            }else{
                resolve(savedCategory);
            }
        });
        // console.log("ok you are elagible for new category",cate);
    })
    .catch(error => {
        console.log('created duplicate check again')
        reject(error)
    });
});
}

//    second for get categories
categoryServices.getlistOfcategory=(req)=>{
    return new Promise((resolve,reject)=>{
        categorymodel.find()
        .exec((err,Categorylist)=>{
            if(err){
                reject(err);
            }
            else{
                resolve(Categorylist);
            }
        })


    })
}



  categoryServices.checkForDuplicateCategory=(req)=>{
    return new Promise((resolve, reject) => {
		categorymodel.findOne({name: req.body.name})
		.exec((err, foundCategory) => {
			if(err){
				reject(err);
			}
			else if(foundCategory == null){
				resolve({
					"message": "No Category found",
					"statusCode": 404
				});
			}
			else{
				reject({"message": "some Thing Wrong in Authantication"});
			}
		});
	});
}



categoryServices.deletecategory=(req)=>{
    console.log('find category id',req.params.categoryId,'user id',req.params.userId)
    return new Promise((resolve,reject)=>{

        categoryServices.userauthorization(req.params.userId)
        .then((response)=>{
                //   then authorization        
        categorymodel.findByIdAndDelete(req.params.categoryId)
        .exec((err,foundcategory)=>{
            if(err){
                reject(err)
            }
            else{
                 if(foundcategory==null){
                     resolve({statusCode:404,"message":"Not Found"})
                 }
                else{
                resolve({"message":"Your Category Sucessfully Deleted","id":req.params.categoryId})
                }
            }
        })

    })
    //    then end auth 
    .catch((err)=>{
        console.log('category delete authorization issue');
         reject(err)
    })



    })
}



categoryServices.userauthorization=(req)=>{
    return new Promise((resolve,reject)=>{
        usermodel.findById(req)
        .exec((err,founduser)=>{
            if(err){
                reject(err)
                // console.log("you are unelagible");
            }
            else if(founduser.role > 0){
                resolve(founduser)
                // console.log("you are elgible for create category")

            }
            else{
                // console.log("not found ");
                reject({"message":"YOU ARE NOT ELAGIBLE FOR CATEGORY CREATE"})
            }
        })
    })
}

module.exports=categoryServices;