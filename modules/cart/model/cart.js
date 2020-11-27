const mongoose=require('mongoose');
const { schema } = require('../../auth/model/auth');
// const { count, schema } = require('../../auth/model/auth');

const Schema=mongoose.Schema;

const cartSchema=new mongoose.Schema({
      user_id:{type:Schema.Types.ObjectId,ref:'User'},  
      item:[
        {product: { type: Schema.Types.ObjectId, ref: "products" },
        name: String,
        price: {
            type:Number,
            required:true
        },
        count: {
            type:Number,
            required:true,
        }
      }
],
},{
    timestamps:true
})
module.exports=mongoose.model('cartitem',cartSchema)