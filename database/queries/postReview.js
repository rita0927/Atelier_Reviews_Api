const { Review, CharacteristicReview, ReviewPhoto } = require('../schema');


const postReview = async (newReview) => {
  // console.log('CREATING NEW REVIEW:', newReview)

  try {

    const [reviewCount, photoCount, characteristicCount] = await Promise.all([Review.count(), ReviewPhoto.count(), CharacteristicReview.count()]);

    // console.log('COUNT:', reviewCount, photoCount, characteristicCount)

    await Review.create({
      id: reviewCount + 1,
      product_id: newReview.product_id,
      rating: newReview.rating,
      date: new Date().getTime(),
      summary: newReview.summary,
      body: newReview.body,
      recommend: newReview.recommend,
      reported: false,
      reviewer_name: newReview.name,
      reviewer_email: newReview.email,
      response: '',
      helpfulness: 0
    })

    if (newReview.photos) {
      await newReview.photos.forEach((photo, index) => {
        ReviewPhoto.create({
          id: photoCount + index + 1,
          review_id: reviewCount + 1,
          url: photo
        })
      })
    }

    if (newReview.characteristics) {
      const characteristicValues = Object.entries(newReview.characteristics)
      await characteristicValues.forEach((characteristic, index) => {
        // console.log('characteristic:', characteristic)
        CharacteristicReview.create({
          id: characteristicCount + index + 1,
          characeristic_id: characteristic[1].id,
          review_id: reviewCount + 1,
          value: characteristic[1].value
        })
      })
    }

  } catch (err) {
    console.log(err)
  }
  // return newReview

}


module.exports = postReview