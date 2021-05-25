const key = require('./config/keys');

const express = require('express')
const app = express()
const fs = require('fs')
const stripe = require('stripe')(key.stripeSecretKey)
const port = process.env.PORT || 5000;

app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))


app.get('/', (req,res) =>{
  res.render('home')
})

app.get('/events', (req,res) =>{
  res.render('events')
})

app.get('/donation', function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end()
    } else {
      res.render('donation', {
        stripePublicKey: key.stripePublishableKey,
        items: JSON.parse(data)
      })
    }
  })
})

app.post('/purchase', function(req, res) {
  fs.readFile('items.json', function(error, data) {
    if (error) {
      res.status(500).end()
    } else {
      const itemsJson = JSON.parse(data)
      const itemsArray = itemsJson.smallCurrency.concat(itemsJson.smallCurrency)
      let total = 0
      req.body.items.forEach(function(item) {
        const itemJson = itemsArray.find(function(i) {
          return i.id == item.id
        })
        total = total + itemJson.price * item.quantity
      })

      stripe.charges.create({
        amount: total,
        source: req.body.stripeTokenId,
        currency: 'myr'
      }).then(function() {
        console.log('Charge Successful')
        res.json({ message: 'Donation was successful. Thank you!' })
      }).catch(function() {
        console.log('Charge Fail')
        res.status(500).end()
      })
    }
  })
})

app.listen(port)