var express = require('express')
const mongoose = require('mongoose')
const { Review } = require('../database/index.js')
const getMeta = require('../database/queries/getMeta.js')
const getReviews = require('../database/queries/getReviews.js')
const postReview = require('../database/queries/postReview.js')
const markHelpful = require('../database/queries/markHelpful.js')
const reportReview = require('../database/queries/reportReview.js')

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
  try {
    const reviews = await getReviews(page, count, product_id)
    // console.log('Review:', reviews)
    res.status(200).send(reviews);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})


app.get('/reviews/meta', async (req, res) => {
  const { product_id } = req.query
  try {
    const meta = await getMeta(product_id)
    // console.log('Meta:', meta)
    res.status(200).send(meta);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})

app.post('/reviews', async (req, res) => {

  try {
    // console.log('New Request:', req.body)
    const newReview = await postReview(req.body)
    res.status(201).send('CREATED');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})
//
app.put('/reviews/:review_id/helpful', async (req, res) => {
  // app.put('/reviews/:review_id', async (req, res) => {
  try {
    const { review_id } = req.params
    // console.log('Review_id:', review_id)
    await markHelpful(review_id)
    res.status(204).send('UPDATED');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

})
//
app.put('/reviews/:review_id/report', async (req, res) => {
  // app.put('/reviews/:review_id', async (req, res) => {
  try {
    const { review_id } = req.params
    await reportReview(review_id)
    res.status(204).send('REPORTED');
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

})






module.exports = app;