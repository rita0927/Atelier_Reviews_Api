var express = require('express')
const mongoose = require('mongoose')
const { Review } = require('../database/index.js')
const getMeta = require('../database/queries/getMeta.js')
const getReviews = require('../database/queries/getReviews.js')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));


const DB = process.env.DATABASE_LOCAL

mongoose.connect(DB)
  .then(() => {
    console.log('CONNECTION OPEN')
  })
  .catch(err => {
    console.log('CONNECTION ERRORS!', err)
  })


// app.get('/', (req, res) => {
//   res.send('Hello');
// });


app.get('/reviews', async (req, res) => {
  const { product_id } = req.query
  // console.log('product_id:', product_id)
  const review = await getReviews(product_id)
  // console.log(review)
  try {
    res.status(200).send(review);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})




module.exports = app;