const { Review } = require('../schema');

const getReviews = async (page = 1, count = 5, productId) => {

  // console.log(productId)

  const reviews = {
    product: productId,
    page: page,
    count: count,
    results: []
  }

  try {

    await Review.aggregate([
      {
        $match: { product_id: Number(productId) }
      },
      {
        $lookup: {
          'from': 'reviewphotos',
          'localField': 'id',
          'foreignField': 'review_id',
          'as': 'photos'
        }
      },
      {
        $project: {
          'photos._id': 0,
          'photos.review_id': 0
        }
      },
      {
        $sort: { helpfulness: -1 }
      }
    ])
      .exec()
      .then(res => {
        res.forEach(review => {
          // console.log('Review:', res)
          reviews.results.push(
            {
              "review_id": review.id,
              "rating": review.rating,
              "summary": review.summary,
              "recommend": Boolean(review.recommend),
              "response": review.response,
              "body": review.body,
              "date": new Date(parseInt(review.date)).toISOString(),
              "reviewer_name": review.reviewer_name,
              "helpfulness": review.helpfulness,
              "photos": review.photos
            }
          )
          // console.log('Helpfulness:', review.helpfulness)
        })
      })

  } catch (err) {
    console.log('Get reviews error')

  }

  return reviews

}

module.exports = getReviews