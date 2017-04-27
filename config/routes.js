const express = require('express');
const router  = express.Router();

//req controller
const reviews = require('../controllers/reviews');
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const comments = require('../controllers/comments');
const movies = require('../controllers/movies');
const statics = require('../controllers/statics');



router.get('/', (req, res) => res.render('statics/home'));

function protectRoute(req, res, next) {
  if(!req.session.userId){
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in for that!!');
      res.redirect('/login');
    });
  }
  return next();
}

router.route('/')
.get(statics.index)
.post(reviews.addReviewData);

router.route('/reviews')
.get(reviews.index)
.post(protectRoute, reviews.create);

router.route('/reviews/new')
.get(protectRoute, reviews.new);

//show
router.route('/reviews/:id')
.get(reviews.show)
.put(protectRoute, reviews.update)
.delete(protectRoute, reviews.delete)
.post(protectRoute, comments.create);
// .post(protectRoute, comments.create);



router.route('/reviews/:id/edit')
.get(protectRoute, reviews.edit);

//handling registrations

router.route('/register')
.get(registrations.new)
.post(registrations.create);

router.route('/login')
.get(sessions.new)
.post(sessions.create);

//use delete method(in nav)
router.route('/logout')
.get(sessions.delete);

//handling comments
router.route('reviews/:id/comments/new')
  .get(comments.new);

// router.route('/reviews/:id')

//
router.route('/movie/:id')
 .get(movies.getMovie);



module.exports = router;
