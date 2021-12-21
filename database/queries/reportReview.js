const { Review } = require('../index');

const reportReview = async (review_id) => {

  try {
    await Review.findOneAndUpdate({ id: review_id }, { reported: 'true' })
  } catch (err) {
    console.log(err)
  }

}

module.exports = reportReview