const express = require('express')
require('../database/config')
const redis = require('redis')

const getMeta = require('../database/controller/getMeta')
const getReviews = require('../database/controller/getReviews')
const postReview = require('../database/controller/postReview')
const markHelpful = require('../database/controller/markHelpful')
const reportReview = require('../database/controller/reportReview')


// // Redis connection for deployment
// const client = redis.createClient(
//   { url: 'redis://redis:6379' }
// );

// //Redis connection for local
const client = redis.createClient();



client.connect()

client.on('error', err => {
  console.log('Redis error ' + err);
});

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



//Override the console.log function to an empty function for performance testing
// console.log = function () { };


app.get('/reviews', async (req, res) => {
  const { page, count, product_id } = req.query

  try {
    const redisReviews = await client.get(`reviews?product_id=${product_id}`)
    if (redisReviews) {
      // console.log('review key found in redis')
      return res.status(200).send(JSON.parse(redisReviews))
    } else {
      const reviews = await getReviews(page, count, product_id)
      // console.log('Review in app:', reviews)

      // console.log('review key not available in redis')
      client.set(`reviews?product_id=${product_id}`, JSON.stringify(reviews))

      res.status(200).send(reviews);
    }

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
})




app.get('/reviews/meta', async (req, res) => {
  const { product_id } = req.query

  try {
    const redisMeta = await client.get(`meta?product_id=${product_id}`)

    if (redisMeta) {
      // console.log('meta key found in redis')
      return res.status(200).send(JSON.parse(redisMeta))

    } else {
      // console.log('meta key not available in redis')
      const meta = await getMeta(product_id)
      // console.log('Meta:', meta)
      client.set(`meta?product_id=${product_id}`, JSON.stringify(meta))
      res.status(200).send(meta);
    }

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

})



app.post('/reviews', async (req, res) => {

  try {
    console.log('New Request body:', req.body)
    const newReview = await postReview(req.body)

    const { product_id } = req.body

    // console.log('Delete key from redis')
    client.del(`reviews?product_id=${product_id}`)
    client.del(`meta?product_id=${product_id}`)

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

    const product_id = await markHelpful(review_id)

    // console.log('Delete key from redis')
    client.del(`reviews?product_id=${product_id}`)

    res.status(204).send('UPDATED');

  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }

})

app.put('/reviews/:review_id/report', async (req, res) => {

  try {
    const { review_id } = req.params
    const product_id = await reportReview(review_id)

    // console.log('Delete key from redis')
    client.del(`reviews?product_id=${product_id}`)

    res.status(204).send('REPORTED');

  } catch (err) {
    console.error(err);
    res.sendStatus(500)
  }

})

//Loader.io verify
app.get('/loaderio-86d865bf884c64065ca55745f40b8c9e', (req, res) => {
  res.status(200).send('loaderio-86d865bf884c64065ca55745f40b8c9e')
});



module.exports = app;