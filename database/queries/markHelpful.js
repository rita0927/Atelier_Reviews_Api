const { Review } = require('../index');

const markHelpful = async (reviewId) => {

  try {
    const review = await Review.findOne({ review_id: reviewId })
    const helpfulCount = Number(review.helpfulness) + 1
    // console.log(review.helpfulness)
    await Review.updateOne({ review_id: reviewId }, { helpfulness: helpfulCount })


  } catch (err) {
    console.log(err)
  }

}



module.exports = markHelpful