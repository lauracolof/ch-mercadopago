const express = require('express');
const app = express();
const routes = require('./routes');

app.use(express.json())
app.use(express.urlencoded({ extended: false })) // form;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*') //authorization to recieve petitions from all domains
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header('Access-Control-Allow-Methods', "GET, POST, PUT, OPTIONS, DELETE");
  next();
})

app.get('/', (req, res) => {
  res.status(200).json({ message: 'MercadoPago ' })
});

app.use('/store', routes);

module.exports = app;