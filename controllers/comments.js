const User = require('../models/user');
const Comment = require('../models/comment');
const Review = require('../models/review');

function commentNew(req, res){
  return res.render('/comments/new');
}

function commentCreate(req, res){
  const comment = new Comment(req.body);
  comment.user = res.locals.user._id;
  console.log('COMMENT TO CREATE -------->', comment);
  
  comment
  .save()
  .then(comment => {
    Review.findById(req.params.id)
    .exec()
    .then(review => {
      review.comments.push(comment.id);
      console.log('REVIEW TO SAVE -------->', review);
      review.save();
      console.log('SAVED REVIEW --------->', review);
    });
  })
  .catch(err => {
    return res.render('error', {error: err});
  });
}

module.exports = {
  new: commentNew,
  create: commentCreate
};
