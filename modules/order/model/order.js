

// const orderSchema=new mongoose.Schema({
//     item:[cartSchema],
//     transaction_id:{},
//     amount:{
//         type:Number,
//         required:true
//     },
//     address:{
//         type:String,
//         required:true,
//     },
//     status:{
//         type:String,
//         default:"Not processing",
//         enum:["Not processing","processing","shipped","Deliverd","completed"]
//     },
//     updated:Date,
//     user:{
//         type:ObjectId,
//         ref:"User"
//     }
// },{
//     timestamps:true
// })

// const Orderitem=mongoose.model('order',orderSchema);

// module.exports={Orderitem,Cartitem};