const { Review } = require('../schema');

const reportReview = async (review_id) => {

  let report

  try {
    report = await Review.findOneAndUpdate({ id: review_id }, { reported: 'true' })
  } catch (err) {
    console.log(err)
  }

  return report.product_id
}

module.exports = reportReview