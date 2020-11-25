const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32
    },
    discription:{
        type:String,
        required:true,
        maxlength:2000,
        trim:true
    },
    category:{
      type:ObjectId,
      required:true,
      ref:'Category'    
    },
    price:{
        type:Number,
        required:true,
        maxlength:10,
        trim:true
    },
    photo:{
        type:String,
        // required:true
    },
    qunatity:{
       type:Number,
       required:true,
       default:1
    },
    sold:{
        type:Number,
        default:0
    },
    shipping:{
        type:Boolean,
        default:false
    }
},{
 timestamps:true  
})

module.exports=mongoose.model('products',productSchema);
