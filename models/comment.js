const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  text: { type: String },
  author: { type: String },
  user: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
  review: {type: mongoose.Schema.Types.ObjectId, ref: 'Review'}
});

module.exports = mongoose.model('Comment', commentSchema);
