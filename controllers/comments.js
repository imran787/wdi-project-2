const User = require('../models/user');
const Comment = require('../models/comment');
const Review = require('../models/review');

function commentNew(req, res){
  return res.render('/comments/new');
}

function commentCreate(req, res){
  Comment
  .create(req.body)
  .then(comment => {
    Review.findById(req.params.id)
    .exec()
    .then(review => {
      review.comments.push(comment.id);
      review.save();
    });
    if(!comment) return res.render('error', {error: 'No comment has been created!'});
    return res.redirect(`/reviews/${req.params.id}`);
  })
  .catch(err => {
    return res.render('error', {error: err});
  });
}

module.exports = {
  new: commentNew,
  create: commentCreate
};
