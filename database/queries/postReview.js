const { Review, CharacteristicReview, ReviewPhoto } = require('../index');


const postReview = (newReview) => {


  const countReview = Review.count()
  const countPhoto = ReviewPhoto.count()
  const countCharacteristics = CharacteristicReview.count()

  Promise.all([countReview, countPhoto, countCharacteristics])
    .then(counts => {

      const [reviewCount, photoCount, characteristicsCount] = counts
      // console.log('COUNT:', reviewCount, photoCount, characteristicsCount)
      Review.create({
        id: reviewCount + 1,
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

      if (newReview.photos) {
        newReview.photos.forEach((photo, index) => {
          ReviewPhoto.create({
            id: photoCount + index + 1,
            review_id: reviewCount + 1,
            url: photo
          })
        })
      }

      if (newReview.characteristics) {
        const characteristicValues = Object.entries(newReview.characteristics)
        characteristicValues.forEach((characteristic, index) => {
          CharacteristicReview.create({
            id: characteristicsCount + index + 1,
            characeristic_id: Number(characteristic[0]),
            review_id: reviewCount + 1,
            value: characteristic[1]
          })
        })
      }


    })
    .catch(err => {
      console.log(err)
    })

}

module.exports = postReview