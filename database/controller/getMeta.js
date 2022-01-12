const { Review, Characteristic } = require('../schema');

//Override the console.log function to an empty function for performance testing
// console.log = function () { };


const getMeta = async (productId) => {

  const meta = {
    product_id: productId,
    ratings: {
      1: '0',
      2: '0',
      3: '0',
      4: '0',
      5: '0'
    },
    recommended: {
      false: 0,
      true: 0
    },
    characteristics: {}
  }

  try {
    const ratingRes = await Review.aggregate([
      {
        $match: { product_id: parseInt(productId) }
      },
      {
        $sort: { '_id': 1 }
      },
      {
        $group: {
          '_id': '$rating',
          'count': { $sum: 1 }
        }
      }
    ])

    ratingRes.forEach(rating => {
      meta.ratings[rating._id] = rating.count.toString() || '0'
    })

    // console.log('ratings:', meta.ratings)


    const recommendRes = await Review.aggregate([
      {
        $match: { product_id: parseInt(productId) }
      },
      {
        $sort: { '_id': 1 }
      },
      {
        $group: {
          '_id': '$recommend',
          'count': { $sum: 1 }
        }
      }
    ])

    meta.recommended.false = recommendRes[0] ? recommendRes[0].count.toString() : '0'
    meta.recommended.true = recommendRes[1] ? recommendRes[1].count.toString() : '0'
    // console.log('recommended:', meta.recommended)


    const characteristicRes = await Characteristic.aggregate([
      {
        $match: { product_id: parseInt(productId) }
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

    // console.log('characteristicRes', characteristicRes)

    characteristicRes.forEach(char => {
      const charValue = (char.characteristics.reduce((sum, cur) => {
        return sum + cur
      }, 0) / char.characteristics.length) || '0'

      meta.characteristics[char.name] = {
        id: char.id,
        value: charValue.toString()
      }
    })
    // console.log('characteristics:', meta)

  } catch (err) {
    console.log(err)
  }


  return meta


}

module.exports = getMeta














