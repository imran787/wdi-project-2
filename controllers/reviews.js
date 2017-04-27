const Review = require('../models/review');
const Comment = require('../models/comment');
const rp      = require('request-promise');
//new and create above show

function reviewIndex(req, res){
  Review
  .find()
  .exec()
  .then(review => {
    return res.render('reviews', {review});
  })
  .catch(err => {
    return res.render('error', {error: err});
  });
}

function reviewNew(req, res){
  return res.render('reviews/new');
}

function reviewCreate(req, res){
  Review
  .create(req.body)
  .then(review => {
    if(!review) return res.render('error', {error: 'No review has been created!'});
    return res.redirect('/reviews');
  })
  .catch(err => {
    return res.render('error', {error: err});
  });
}


function reviewShow(req, res){
  Review
  .findById(req.params.id)
  .populate({
    path: 'comments',
    model: 'Comment',
    populate: {
      path: 'user',
      model: 'User'
    }

  })
  .exec()
  .then(review => {
    console.log('REVIEWS SHOW ----->', review);
    if(!review){
      return res.render('error', {error: 'No review has been found.'});
    }
    console.log(review);
    return res.render('reviews/show', {review});
  })
  .catch(err => {
    return res.render('error', {error: err});
  });
}

function reviewEdit(req, res){
  Review
  .findById(req.params.id)
  .exec()
  .then(review => {
    if(!review){
      return res.render('error', {error: 'No review wa found!'});
    }
    return res.render('reviews/edit', {review});
  })
  .catch(err => {
    return res.render('error', {error: err});
  });
}

function reviewUpdate(req, res){
  Review
  .findById(req.params.id)
  .exec()
  .then(review => {
    if(!review){
      return res.render('error', {error: 'No review has been found!'});
    }
    for(const field in req.body){
      review[field] = req.body[field];
    }
    return review.save();
  })
  .then(review => {
    if(!review){
      return res.render('error', {error: 'Something went wrong during the update'});
    }
    return res.render('reviews/show', {review});
  })
  .catch(err => {
    return res.render('error', {error: err});
  });
}

function reviewDelete(req, res){
  Review
  .findByIdAndRemove(req.params.id)
  .exec()
  .then(() => {
    return res.redirect('/reviews');
  })
  .catch(err => {
    return res.render('error', {error: err});
  });
}

function addReviewData(req, res) {
  // rp()
  var data = req.body.data;
  res.render('reviews/new', { data });
}

module.exports = {
  index: reviewIndex,
  new: reviewNew,
  create: reviewCreate,
  show: reviewShow,
  edit: reviewEdit,
  update: reviewUpdate,
  delete: reviewDelete,
  addReviewData: addReviewData
};
