const { Review, CharacteristicReview, ReviewPhoto } = require('../index');

const postReview = async (newReview) => {
  await Review.count({})
    .exec()
    .then(reviewCount => {
      // console.log('New Review:', newReview)
      Review.create({
        id: Number(reviewCount) + 1,
        product_id: newReview.product_id,
        rating: newReview.rating,
        date: new Date().getTime(),
        summary: newReview.summary,
        body: newReview.body,
        recommend: newReview.recommend,
        reported: 'false',
        reviewer_name: newReview.name,
        reviewer_email: newReview.email,
        response: '',
        helpfulness: 0
      })
    })
    .then(() => {
      ReviewPhoto.count({})
        .exec()
        .then(photoCount => {
          if (newReview.photos) {
            newReview.photos.forEach((photo, index) => {
              ReviewPhoto.create({
                id: Number(photoCount) + index + 1,
                review_id: Number(reviewCount) + 1,
                url: photo
              })
            })
          }
        })
    })
    .then(() => {
      CharacteristicReview.count({})
        .exec()
        .then(characteristicsCount => {
          if (newReview.characteristics) {
            newReview.characteristics.forEach((val, index) => {
              CharacteristicReview.create({
                id: Number(characteristicsCount) + index + 1,
                characeristic_id: index + 1,
                review_id: Number(reviewCount) + 1,
                value: val
              })
            })
          }
        })
    })

  // return newReview
}
module.exports = postReview

