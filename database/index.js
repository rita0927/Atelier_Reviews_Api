const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  id: Number,
  product_id: Number,
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
  id: Number,
  product_id: Number,
  name: String
});

const characteristicReviewsSchema = new Schema({
  id: Number,
  characteristic_id: Number,
  review_id: Number,
  value: Number
});

const reviewPhotoSchema = new Schema({
  id: Number,
  review_id: Number,
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
