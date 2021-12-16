const {
  Review,
  ReviewPhoto,
  Characteristic,
  CharacteristicReview
} = require('../index');

const getReviews = (productId) => {

  console.log('Calling getReviews')
  console.log(productId)
  return Review.aggregate([
    {
      $match: { product_id: productId }
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
    .then(res => res)

}

module.exports = getReviews