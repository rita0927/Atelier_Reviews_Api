const express = require('express')
require('../database/config')
const getMeta = require('../database/controller/getMeta')
const getReviews = require('../database/controller/getReviews')
const postReview = require('../database/controller/postReview')
const markHelpful = require('../database/controller/markHelpful')
const reportReview = require('../database/controller/reportReview')


const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

//Override the console.log function to an empty function for performance testing
console.log = function () { };

app.get('/reviews', async (req, res) => {
  const { page, count, product_id } = req.query
  try {
    const reviews = await getReviews(page, count, product_id)
    // console.log('Review in app:', reviews)
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



app.put('/reviews/:review_id/helpful', async (req, res) => {

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

app.put('/reviews/:review_id/report', async (req, res) => {

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