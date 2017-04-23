const Review = require('../models/review');

function reviewIndex(req, res){
  Review
   .find()
   .exec()
   .then(reviews => {
     return res.render('reviews', {reviews});
   })
   .catch(err => {
     return res.render('error', {error: err});
   });
}

module.exports = {
  index: reviewIndex
}
