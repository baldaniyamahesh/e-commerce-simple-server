const exppress=require('express');
const authcontroll=require('../auth/controlls/auth')
const users=require('../users/controllers/usercontrollers')
const router=exppress.Router();

router.get('/users/list',users.alluserlist);
router.get('/users/:userId',users.findUserById);
router.put('/users/:userId',users.updateduserdata);

module.exports=router;