const { Review } = require('../schema');

const markHelpful = async (review_id) => {

  try {

    await Review.findOneAndUpdate({ id: review_id },
      { $inc: { 'helpfulness': 1 } }
    )

  } catch (err) {
    console.log(err)
  }

}



module.exports = markHelpful