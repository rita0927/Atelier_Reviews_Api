const request = require('supertest')
const _globals = require('@jest/globals')
const mongoose = require('mongoose')


const app = require('../server/app')
const getReviews = require('../database/controller/getReviews')
const getMeta = require('../database/controller/getMeta.js')
const postReview = require('../database/controller/postReview.js')
const markHelpful = require('../database/controller/markHelpful.js')
const reportReview = require('../database/controller/reportReview.js')


afterAll(async () => {
  await mongoose.connection.close()
})


afterEach(() => {
  jest.clearAllMocks();
});



jest.mock('../database/controller/getReviews', () => jest.fn())
jest.mock('../database/controller/getMeta.js', () => jest.fn())
jest.mock('../database/controller/postReview', () => jest.fn())
jest.mock('../database/controller/markHelpful', () => jest.fn())
jest.mock('../database/controller/reportReview', () => jest.fn())



const mockData = {
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


  it('should get reviews', async () => {
    getReviews.mockResolvedValue({
      data: [
        mockData
      ]
    })

    const response = await request(app)
      .get('/reviews')
      .query({ product_id: 1 })

    expect(getReviews.mock).toBeTruthy();
    expect(getReviews).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(200)
    expect(response.body.data[0].product_id).toBe(1)

  })

  //mock and catch an error
  it('should respond with a 500 status code', async () => {
    getReviews.mockImplementation(() => {
      throw new Error('Fail to get reviews');
    });

    const response = await request(app)
      .get('/reviews')
      .query({ product_id: 1 })

    expect(response.statusCode).toBe(500)
  })

})

describe('GET meta', () => {

  it('should get meta', async () => {
    getMeta.mockResolvedValue({
      data: [
        mockData
      ]
    })

    const response = await request(app)
      .get('/reviews/meta')
      .query({ product_id: 1 })

    expect(getMeta.mock).toBeTruthy();
    expect(getMeta).toHaveBeenCalledTimes(1)
    expect(response.status).toBe(200)
    expect(response.body.data[0].rating).toBe(1)
  })

  //mock and catch an error
  it('should respond with a 500 status code', async () => {
    getMeta.mockImplementation(() => {
      throw new Error('Fail to get meta');
    });

    const response = await request(app)
      .get('/reviews/meta')
      .query({ product_id: 1 })

    expect(response.statusCode).toBe(500)
  })

})


describe('POST reviews', () => {

  it('should post a review with a 201 status code', async () => {
    postReview.mockResolvedValue('CREATED')
    const response = await request(app)
      .post('/reviews')
      .send(mockData)

    expect(postReview.mock).toBeTruthy();
    expect(postReview).toHaveBeenCalledTimes(1)
    expect(postReview.mock.calls[0][0].product_id).toBe(1)
    expect(response.statusCode).toBe(201)
    expect(response.text).toBe('CREATED')

  })

  //mock and catch an error
  it('should respond with a 500 status code', async () => {
    postReview.mockImplementation(() => {
      throw new Error('Fail to post a review');
    });

    const response = await request(app)
      .post('/reviews')
      .send(mockData)

    expect(response.statusCode).toBe(500)
  })

})


describe('PUT reviews', () => {

  it('should respond with a 204 status code', async () => {

    const response = await request(app)
      .put('/reviews/1/helpful')

    expect(markHelpful.mock).toBeTruthy();
    expect(markHelpful).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toBe(204)

  })

  //mock and catch an error
  it('should respond with a 500 status code', async () => {
    markHelpful.mockImplementation(() => {
      throw new Error('Fail to update helpfulness');
    });

    const response = await request(app)
      .put('/reviews/1/helpful')

    expect(response.statusCode).toBe(500)

  })


  it('should respond with a 204 status code', async () => {

    const response = await request(app)
      .put('/reviews/1/report')

    expect(reportReview.mock).toBeTruthy();
    expect(reportReview).toHaveBeenCalledTimes(1)
    expect(response.statusCode).toBe(204)

  })

  //mock and catch an error
  it('should respond with a 500 status code', async () => {
    reportReview.mockImplementation(() => {
      throw new Error('Fail to report review');
    });

    const response = await request(app)
      .put('/reviews/1/report')

    expect(response.statusCode).toBe(500)
  })

})




