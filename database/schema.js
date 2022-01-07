const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  id: { type: Number, index: true },
  product_id: { type: Number, index: true },
  rating: { type: Number, index: true },
  date: { type: Number, index: true },
  summary: { type: String, index: true },
  body: { type: String, index: true },
  // recommend: Boolean,
  // reported: Boolean,
  recommend: { type: String, index: true },
  reported: { type: String, index: true },
  reviewer_name: { type: String, index: true },
  reviewer_email: { type: String, index: true },
  response: { type: String, index: true },
  helpfulness: { type: Number, index: true }
});

const characteristicSchema = new Schema({
  id: { type: Number, index: true },
  product_id: { type: Number, index: true },
  name: { type: String, index: true }
});

const characteristicReviewsSchema = new Schema({
  id: { type: Number, index: true },
  characteristic_id: { type: Number, index: true },
  review_id: { type: Number, index: true },
  value: { type: Number, index: true }

});

const reviewPhotoSchema = new Schema({
  id: { type: Number, index: true },
  review_id: { type: Number, index: true },
  url: { type: String, index: true }
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