const { response } = require('express');
const custservices=require('../userservices');

  const usercontroller={}

    finduserbyid=(req,res)=>{
          custservices.getsingleuser(req)
          .then(response=>{
              console.log(response);
              return res.send(response);
          })
          .catch(err=>{
              console.log(err);
              return res.send(err);
          })

    }