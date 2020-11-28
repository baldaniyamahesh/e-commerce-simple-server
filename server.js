const  express = require('express')
const dbconfig=require('./config/db.config');
const mongoose=require('mongoose');
const bodyParser = require('body-parser')
const cors=require('cors');
const morgan=require('morgan');
const expressVadilator = require('express-validator');
const cookieparser=require('cookie-parser')
const path=require('path')
const stripe=require('stripe');
   
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


app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs')


app.get('/', function(req, res){ 
    res.render('home', { 
       key: Publishable_Key 
    }) 
}) 

app.post('/payment', function(req, res){ 
  
    // Moreover you can take more details from user 
    // like Address, Name, etc from form 
    
    stripe.customers.create({ 
        email: req.body.stripeEmail, 
        source: req.body.stripeToken, 
        name: 'Gourav Hammad', 
        address: { 
            line1: 'TC 9/4 Old MES colony', 
            postal_code: '452331', 
            city: 'Indore', 
            state: 'Madhya Pradesh', 
            country: 'India', 
        } 
    }) 
    .then((customer) => { 
  
        return stripe.charges.create({ 
            amount: 2500,     // Charing Rs 25 
            description: 'Web Development Product', 
            currency: 'INR', 
            customer: customer.id 
        }); 
    }) 
    .then((charge) => { 
        res.send("Success")  // If no error occurs 
    }) 
    .catch((err) => { 
        res.send(err)       // If some error occurs 
    }); 
}) 
  
mongoose.connect(dbconfig.url,{useCreateIndex: true, useNewUrlParser: true,useUnifiedTopology: true},()=>{
    console.log('db connected');
})

app.get('/', (req, res) => res.send('Hello World!'))
let user = require('./modules/users/routers');
let auth=require('./modules/auth/routers');
let product=require('./modules/products/routers');
let order=require('./modules/order/router');
let cart=require('./modules/cart/router');
let payment=require('./modules/payment/router');
// const router = require('./modules/products/routers');

app.use('/e-comerce', auth,user,product,order,cart,payment);

app.listen(port, () => console.log(`Example app listening on port port!`));