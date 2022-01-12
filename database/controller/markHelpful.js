const { Review } = require('../schema');

const markHelpful = async (review_id) => {

  let helpful

  try {

    helpful = await Review.findOneAndUpdate({ id: review_id },
      { $inc: { 'helpfulness': 1 } }
    )

  } catch (err) {
    console.log(err)
  }

  return helpful.product_id

}



module.exports = markHelpful