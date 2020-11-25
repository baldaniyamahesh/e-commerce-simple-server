const express=require('express');
const productcontroll = require('./controllers/products');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req, file, cb){
         cb(null, 'uploads')
    },
    filename: function(req, file, cb){
         cb(null, new Date().toISOString() + file.originalname)
    }
})
const imageFilter = function (req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ) {
        cb(null, true)
       }else{
      cb(null, false)
       }
}
const uploads = multer({storage: storage,
    limits:{
   fieldSize: 1024 * 1024 * 10
},   
    fileFilter: imageFilter
})

const router=express.Router();

router.get('/product/list', productcontroll.allproduct);
router.post('/product/create/:userId',uploads.single('image'),productcontroll.addoneproduct)



module.exports=router;