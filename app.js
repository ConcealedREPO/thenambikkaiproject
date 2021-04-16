
const express = require('express')
const keys = require('./config/keys')
const stripe = require('stripe')(keys.stripeSecretKey) //secret key
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

const app = express()
const port = process.env.PORT || 5000;

// Handlebars Middleware 
app.engine('handlebars',exphbs({defaultLayout:'main'}))
app.set('view engine','handlebars')

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))

//Set static folder
app.use(express.static(`${__dirname}/public`))

//Index Route
app.get('/', (req,res) => {
  res.render('index',{
    stripePublishableKey:keys.stripePublishableKey
  });
})


//Charge Route
app.post('/charge', (req,res) =>{
  let payAmount = 2000
  
  stripe.customers.create({
    email:req.body.stripeEmail,
    source:req.body.stripeToken
  })
  .then(customer => stripe.charges.create({
    amount: payAmount,
    description: "donation for laptop",
    currency:"myr",
    customer:customer.id
  }))
  .then(charge => res.render('index'))
});

app.listen(port,() =>{
  console.log(`Server Started on port ${port}`)
})