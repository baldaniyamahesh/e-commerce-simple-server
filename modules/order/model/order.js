const mongoose=require('mongoose')
const Schema=mongoose.Schema;
const crypto = require("crypto");
const transaction_ids= crypto.randomBytes(16).toString("hex");
const orderSchema=new mongoose.Schema({
    cart:{
        type:Schema.Types.ObjectId,
        ref:'cartitem'
    },
    transaction_id:
    {  type:String,
       default:transaction_ids
    },
    amount:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"Not processing",
        enum:["Not processing","processing","shipped","Deliverd","completed"]
    },
    updated:Date,
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

// const Orderitem=mongoose.model('order',orderSchema);

// module.exports={Orderitem,Cartitem};
module.exports=mongoose.model('order',orderSchema);