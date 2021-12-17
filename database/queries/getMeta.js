const { Review, Characteristic } = require('../index');

const getMeta = async (productId) => {

  const meta = {
    product_id: productId,
    ratings: {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    },
    recommended: {
      false: 0,
      true: 0
    },
    characteritics: {}
  }

  await Review.aggregate([
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
  ]).exec()
    .then(res => {
      res.forEach(rating => {
        meta.ratings[rating._id] = rating.count || 0
      })
      // console.log('ratings:', meta.ratings)
    })


  await Review.aggregate([
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
  ]).exec()
    .then(res => {
      if (res.length) {
        meta.recommended.false = res[0].count
        meta.recommended.true = res[1].count
      }
      // console.log('recommended:', meta.recommended)
    })



  await Characteristic.aggregate([
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
  ]).exec()
    .then(res => {
      res.forEach(char => {
        meta.characteritics[char.name] = {
          'id': char.id,
          'value': char.characteristics.reduce((sum, cur) => {
            return sum + Number(cur)
          }, 0) / char.characteristics.length || 0
        }
      })
      // console.log('ratings:', meta.characteritics)
    })


  return meta


}

module.exports = getMeta