const mercadopago = require('mercadopago');
require('dotenv').config()

mercadopago.configure({
  sandbox: true,
  access_token: process.env.ACCESS_TOKEN
})

const payment = (req, res) => {
  const { amount, description } = req.body;
  const preference = {
    items: [
      {
        title: description,
        unit_price: parseFloat(amount),
        quantity: 1
      },
      {
        back_urls: {
          success: 'http://localhost:3000', //http://localhost:3000/success
          failure: 'http://localhost:3000', // http://localhost:3000/failure
          pending: 'http://localhost:3000' // http://localhost:3000/pending
        },
        auto_return: 'approved'
      }
    ]
  }
  // is a promise
  mercadopago.preferences.create(preference)
    .then((response) => {
      //response is a {body and init_point}
      //init point is a route to create payment
      res.json({ init_point: response.body.init_point })
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: 'Error on payment execution ', error })
    })
}


module.exports = { payment }