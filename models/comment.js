const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  text: { type: String },
  author: { type: String },
  review: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}
});

module.exports = mongoose.model('Comment', commentSchema);
