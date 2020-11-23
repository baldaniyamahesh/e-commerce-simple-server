const exppress=require('express');
const authcontroll=require('../auth/controlls/auth')
const router=exppress.Router();

router.get('/users/:userId',authcontroll.usersignin,authcontroll.isAuth);


module.exports=router;