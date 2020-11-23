const usermodel=require('../auth/model/auth');

const custServices={}

  custServices.getsingleuser=(req)=>{
          return new Promise((resolve,reject)=>{
            //   if(req==null){
            //      reject({"message":"user Id Empty",
            //              "statuscode":500
            //     })
                 
            //   }
            //   else{
              usermodel.findOne(req)
              
              .exec((err,founduser)=>{
                  if(err){
                      reject({"message":"USER ARE NOT FOUND"});
                  }
                  else{
                      resolve ({
                          "message":"get User Successfully",
                          "user":founduser
                      })
                  }
              })
          })
  }


 module.exports=custServices;  