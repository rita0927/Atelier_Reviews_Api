const { Review } = require('../schema');


//console.log will reduce program's performance since it takes computational time
//console.log is a lot slower than an empty function. Override the console.log function to an empty function
// console.log = function () { };


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
      // {
      //   $match: {
      //     product_id: parseInt(productId)
      //   }
      // },
      {
        $match: {
          $and: [{ product_id: parseInt(productId) }, { reported: 'false' }]
        }
      },
      {
        $sort: {
          helpfulness: -1
        }
      },
      {
        $limit: parseInt(count)
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
      }
    ])
      // .exec()
      .then(res => {
        res.forEach(review => {
          // console.log('Review:', res)
          reviews.results.push(
            {
              "review_id": review.id,
              "rating": review.rating,
              "summary": review.summary,
              "recommend": review.recommend === 'true',
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
  // console.log('GetReview:', reviews)
  return reviews

}

module.exports = getReviews