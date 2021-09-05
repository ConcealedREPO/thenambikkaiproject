const key = require('./config/keys')
const express = require('express')
const app = express()
const stripe = require('stripe')(key.stripeSecretKey)
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

app.get('/',(req,res) => {
  res.render("home",{
    stripePublicKey: key.stripePublishableKey
  })
})

app.get('/about',(req,res) => {
  res.render("about",{
    stripePublicKey: key.stripePublishableKey
  })
})

app.get('/events',(req,res) => {
  res.render("events",{
    stripePublicKey: key.stripePublishableKey
  })
})

app.post("/create-session",async(req,res) =>{
  const {donationAmount} = req.body
  const session = await stripe.checkout.sessions.create({
    payment_method_types :['card'],
    success_url: "https://thenambikkaiproject.com/",
    cancel_url: "https://thenambikkaiproject.com/",
    line_items: [{
      price_data: {
        unit_amount : parseInt(donationAmount*100),
        currency: 'myr',
        product_data:{
          name: "donation"
        }
      },
      quantity: 1,
    }],
    mode: 'payment'
  })
  res.send({sessionId: session.id})
})


app.listen(port)