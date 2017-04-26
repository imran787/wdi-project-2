const User = require('../models/user');
const Comment = require('../models/comment');
const Review = require('../models/review');

function commentNew(req, res){
  return res.render('/comments/new');
}

function commentCreate(req, res){
  const comment = new Comment(req.body);
  comment.user = res.locals.user._id;

  comment
  .save()
  .then(comment => {
    return Review.findById(req.params.id).exec();
  })
  .then(review => {
    review.comments.push(comment.id);
    return review.save();
  })
  .then(review => {
    res.redirect(`/reviews/${review._id}`);
  })
  .catch(err => {
    return res.render('error', {error: err});
  });
}

module.exports = {
  new: commentNew,
  create: commentCreate
};
