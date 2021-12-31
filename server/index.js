const app = require('./app.js')

// const PORT = process.env.PORT || 3000
const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`)
})