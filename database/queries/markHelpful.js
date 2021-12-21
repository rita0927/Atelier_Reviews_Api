const { Review } = require('../index');

const markHelpful = async (review_id) => {

  try {

    const review = await Review.findOne({ id: review_id })
    const update = { helpfulness: Number(review.helpfulness) + 1 }
    await review.updateOne(update)

  } catch (err) {
    console.log(err)
  }

}

module.exports = markHelpful