const app = require('./app.js')

// const PORT = process.env.PORT || 3000
const PORT = process.env.PORT

// const redis = require('redis')

// // Create Redis Client
// let client = redis.createClient();

// client.on('connect', function () {
//   console.log('Connected to Redis...');
// });


app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})