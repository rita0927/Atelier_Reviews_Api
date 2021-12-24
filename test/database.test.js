const request = require('supertest')
const _globals = require('@jest/globals')

const mongoose = require('mongoose')
require('dotenv').config()
const DB = process.env.DATABASE_MOCK

mongoose.connect(DB)

const { Review, ReviewPhoto, Characteristic, CharacteristicReview } = require('../database/schema');


afterAll(async () => {
  await mongoose.connection.close()
})


const mockReview = {
  "product_id": 1,
  "rating": 1,
  "summary": "test summary",
  "body": "test body",
  "recommend": "true",
  "reported": "false",
  "reviewer_name": "test",
  "reviewer_email": "test@gmail.com",
  "response": "",
  "helpfulness": 0,
  "photos": ["https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/cute-baby-animals-1558535060.jpg"],
  "characteristics": {
    "Comfort": { "id": 198976, "value": 1 },
    "Length": { "id": 198975, "value": 2 },
    "Fit": { "id": 198974, "value": 2 },
    "Quality": { "id": 198977, "value": 3 }
  }
}



describe('GET reviews', () => {


  describe('given a product_id', () => {

    it('should get reviews', async () => {
      const productID = 1
      const reviews = await Review.find({ product_id: productID })

      const expected = 2
      const actual = reviews.length
      expect(actual).toEqual(expected)

    })

    it('should post a review', async () => {
      const newReview = new Review(mockReview)
      await newReview.save()
      const review = await Review.findOne({ reviewer_name: "test" })

      const expected = 'test summary'
      const actual = review.summary
      expect(actual).toEqual(expected)

      await Review.deleteOne({ reviewer_name: "test" })
    })

  })

})



