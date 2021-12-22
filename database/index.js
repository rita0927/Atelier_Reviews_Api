const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  id: { type: Number, index: true },
  product_id: { type: Number, index: true },
  rating: Number,
  date: String,
  summary: String,
  body: String,
  recommend: Boolean,
  reported: Boolean,
  reviewer_name: String,
  reviewer_email: String,
  response: String,
  helpfulness: Number
});

const characteristicSchema = new Schema({
  id: { type: Number, index: true },
  product_id: { type: Number, index: true },
  name: String
});

const characteristicReviewsSchema = new Schema({
  id: { type: Number, index: true },
  characteristic_id: { type: Number, index: true },
  review_id: { type: Number, index: true },
  value: Number
});

const reviewPhotoSchema = new Schema({
  id: Number,
  review_id: { type: Number, index: true },
  url: String
});




const Review = mongoose.model('Review', reviewSchema);
const Characteristic = mongoose.model('Characteristic', characteristicSchema);
const ReviewPhoto = mongoose.model('ReviewPhoto', reviewPhotoSchema);
const CharacteristicReview = mongoose.model('CharacteristicReview', characteristicReviewsSchema);


module.exports = {
  Review,
  ReviewPhoto,
  Characteristic,
  CharacteristicReview
}



//database ETL - mongodb import tool, command line code
// mongoimport --type csv --db Atelier_reviews --collection characteristics --headerline --drop --file ../data/characteristics.csv
// mongoimport --type csv --db  Atelier_reviews --collection characteristicreviews --headerline --drop --file ../data/characteristic_reviews.csv
// mongoimport --type csv --db  Atelier_reviews --collection reviewphotos --headerline --drop --file ../data/reviews_photos.csv
// mongoimport --type csv --db  Atelier_reviews --collection reviews --headerline --drop --file ../data/reviews.csv