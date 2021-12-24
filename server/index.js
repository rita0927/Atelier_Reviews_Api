require('dotenv').config()


const app = require('./app.js')
// const app = makeApp()

const PORT = process.env.PORT || 3000


app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})