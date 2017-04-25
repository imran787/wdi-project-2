const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  title: {type: String, trim: true, required: true},
  genre: {type: String, trim: true},
  review: {type: String, trim: true, required: true},
  rating: {type: Number, trim: true, required: true},
  comments: [{ type: mongoose.Schema.ObjectId, ref: 'Comment'}]
}, {
  timestamps: true
});

module.exports = mongoose.model('Review', reviewSchema);
