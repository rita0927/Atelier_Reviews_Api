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


app.get('/reviews', async (req, res) => {
  const { page, count, product_id } = req.query
  const reviews = await getReviews(page, count, product_id)
  // console.log(reviews)
  try {
    res.status(200).send(reviews);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})


app.get('/reviews/meta', async (req, res) => {
  const { product_id } = req.query
  const meta = await getMeta(product_id)
  // console.log(meta)
  try {
    res.status(200).send(meta);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})



module.exports = app;