const { Review } = require('../index');

const reportReview = async (reviewId) => {

  try {
    await Review.findOneAndUpdate({ review_id: reviewId }, { reported: 'true' })
  } catch (err) {
    console.log(err)
  }

}

module.exports = reportReview