const {
  Review,
  ReviewPhoto,
  Characteristic,
  CharacteristicReview
} = require('../index');

const getMeta = (productId) => {


  const recommentCount = Review.aggregate([
    {
      $match: { product_id: productId }
    },
    {
      $group: {
        '_id': '$recommend',
        'count': { $sum: 1 }
      }
    },
    {
      $sort: { '_id': 1 }
    }
  ])
  console.log(recommentCount)

  const ratingCount = Review.aggregate([
    {
      $match: { product_id: productId }
    },
    {
      $group: {
        '_id': '$rating',
        'count': { $sum: 1 }
      }
    },
    {
      $sort: { '_id': 1 }
    }
  ])


  //getProductCharacteristics aggregation

  const characteristicValues = Characteristic.aggregate([
    {
      $match: { product_id: productId }
    },
    {
      $lookup: {
        'from': 'characteristicreviews',
        'localField': 'id',
        'foreignField': 'characteristic_id',
        'as': 'characteristics'
      }
    },
    {
      $project: {
        'id': 1,
        'product_id': 1,
        'name': 1,
        //characteristics is an array of strings. Need to parse and calculate the average
        'characteristics': '$characteristics.value'
      }
    }
  ])





}

module.exports = getMeta