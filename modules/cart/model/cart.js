const mongoose=require('mongoose');
// const { count, schema } = require('../../auth/model/auth');

const Schema=mongoose.Schema;

const cartSchema=new mongoose.Schema({

user_id :{
    type:Schema.Types.ObjectId,
    ref:'User',
    default:null
},
product_id:[{
    type:Schema.Types.ObjectId,
    ref:'products',
    // uniqueItem:true,
    default:null,
}],
quantity:{
    type:Number,
    default:0
}

},{
    timestamps:true
})
module.exports=mongoose.model('cartitem',cartSchema)