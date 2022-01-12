const mongoose = require('mongoose')
require('dotenv').config('../.env')

const DB = process.env.DATABASE_LOCAL
// const DB = process.env.DATABASE_PROD



module.exporots = mongoose.connect(DB)
  .then(() => {
    console.log('CONNECTION OPEN')
  })
  .catch(err => {
    console.log('CONNECTION ERRORS!', err)
  })
