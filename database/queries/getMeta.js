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

  try {
    await Review.aggregate([
      {
        $match: { product_id: Number(productId) }
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
        $match: { product_id: Number(productId) }
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
        meta.recommended.false = res[0] ? res[0].count : 0
        meta.recommended.true = res[1] ? res[1].count : 0
        // console.log('recommended:', meta.recommended)
      })



    await Characteristic.aggregate([
      {
        $match: { product_id: Number(productId) }
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
          const charValue = char.characteristics.reduce((sum, cur) => {
            return sum + cur
          }, 0) / char.characteristics.length || 0
          meta.characteritics[char.name] = {
            'id': char.id,
            // 'value': char.characteristics.reduce((sum, cur) => {
            //   return sum + cur
            // }, 0) / char.characteristics.length || 0
            value: charValue.toString()
          }
        })
        // console.log('characteristics:', meta)
      })

  } catch (err) {
    console.log(err)
  }


  return meta


}

module.exports = getMeta