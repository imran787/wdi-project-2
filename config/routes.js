const express = require('express');
const router  = express.Router();

//req controller
const reviews = require('../controllers/reviews');



router.get('/', (req, res) => res.render('statics/home'));

router.route('/reviews')
  .get(reviews.index)
  .post(reviews.create);

router.route('/reviews/new')
    .get(reviews.new);

//show
router.route('/reviews/:id')
  .get(reviews.show)
  .put(reviews.update)
  .delete(reviews.delete);

router.route('/reviews/:id/edit')
  .get(reviews.edit);

module.exports = router;
