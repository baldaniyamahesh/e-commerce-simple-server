const  express = require('express')
const dbconfig=require('./config/db.config');
const mongoose=require('mongoose');
const bodyParser = require('body-parser')
const cors=require('cors');
const morgan=require('morgan');
const expressVadilator = require('express-validator');
const cookieparser=require('cookie-parser')
require('dotenv').config();
// APP 
const app = express()
const port = 2222;
// const router=express.Router();

// MIDDLE WARE 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(expressVadilator());
app.use(cors());
app.use(morgan('dev'));
app.use(cookieparser());
// 'useNewUrlParser', true);
// mongoose.set('useFindAndModify', false);
// mongoose.set('useCreateIndex', true

mongoose.connect(dbconfig.url,{useCreateIndex: true, useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log('db connected');
})

// app.get('/', (req, res) => res.send('Hello World!'))
let user = require('./modules/users/routers');
let auth=require('./modules/auth/routers');

app.use('/e-comerce', auth,user);
app.listen(port, () => console.log(`Example app listening on port port!`));