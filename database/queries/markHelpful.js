const { Review } = require('../index');

const markHelpful = async (review_id) => {

  try {
    // const review = await Review.findOne({ id: reviewId })
    // const helpfulCount = Number(review.helpfulness) + 1
    // console.log(review.helpfulness)
    // await Review.updateOne({ id: reviewId }, { helpfulness: helpfulCount })
    await Review.findOneAndUpdate({ id: review_id },
      { $inc: { 'helpfulness': 1 } }
    )

  } catch (err) {
    console.log(err)
  }

}



module.exports = markHelpful