const request = require('supertest')
const _globals = require('@jest/globals')

const mongoose = require('mongoose')
require('dotenv').config()
const DB = process.env.DATABASE_MOCK

mongoose.connect(DB)


const { Review, ReviewPhoto, Characteristic, CharacteristicReview } = require('../database/schema');
const getMeta = require('../database/controller/getMeta')
const getReviews = require('../database/controller/getReviews')
const postReview = require('../database/controller/postReview')
const markHelpful = require('../database/controller/markHelpful')
const reportReview = require('../database/controller/reportReview')


afterAll(async () => {
  await Review.deleteOne({ id: 751001 })
  await ReviewPhoto.deleteOne({ review_id: 751001 })
  await CharacteristicReview.deleteOne({ review_id: 751001 })
  await mongoose.connection.close()
})



const mockReview = {
  product_id: 1,
  rating: 1,
  summary: "test summary",
  body: "test body",
  recommend: true,
  reviewer_name: "test",
  reviewer_email: "test@gmail.com",
  response: "",
  helpfulness: 0,
  photos: ["https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-baby-animals-1558535060.jpg"],
  characteristics: {
    Comfort: { id: 198976, value: 5 },
    Length: { id: 198975, value: 5 },
    Fit: { id: 198974, value: 5 },
    Quality: { id: 198977, value: 5 }
  }
}



describe('GET reviews', () => {


  it('should get reviews', async () => {
    const productID = 1
    // const reviews = await Review.find({ product_id: productID })

    const reviews = await getReviews(1, 5, productID)

    const expected1 = 2
    const actual1 = reviews.results.length
    expect(actual1).toEqual(expected1)

    const expected2 = 1
    const actual2 = reviews.results[0].review_id
    expect(actual2).toEqual(expected2)

    const expected3 = 'This product was great!'
    const actual3 = reviews.results[0].summary
    expect(actual3).toEqual(expected3)

  })


})


describe('GET meta', () => {


  it('should get meta', async () => {
    const productID = 1

    const meta = await getMeta(1, 5, productID)
    // console.log(meta)

    const expected1 = '1'
    const actual1 = meta.recommended.false
    expect(actual1).toEqual(expected1)

    const expected2 = 4
    const actual2 = Object.keys(meta.characteristics).length
    expect(actual2).toEqual(expected2)


  })


})


describe('POST a review', () => {

  it('should post a review', async () => {

    const newReview = await postReview(mockReview)
    // console.log('POST NEW REVIEW:', newReview)
    const review = await Review.find({ product_id: 1 })
    // console.log('POSTED REVIEW:', review)

    const expected = 3
    const actual = review.length
    expect(actual).toEqual(expected)

  })


})


describe('Mark helpfulness', () => {


  it('should increase helpfulness by one', async () => {
    const review_id = 1

    await markHelpful(review_id)
    const review = await Review.findOne({ id: review_id })
    // console.log(review.helpfulness)

    const expected = 5
    const actual = review.helpfulness
    expect(actual).toEqual(expected)

    await Review.updateOne({ id: review_id }, { helpfulness: 4 })

  })


})


describe('Report review', () => {


  it('should change reported to true', async () => {
    const review_id = 1

    await reportReview(review_id)
    const review = await Review.findOne({ id: review_id })
    // console.log(review.reported)

    const expected = true
    const actual = review.reported
    expect(actual).toEqual(expected)

    await Review.updateOne({ id: review_id }, { reported: false })

  })



})


