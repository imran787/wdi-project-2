const express = require('express');
const router  = express.Router();

//req controller
const reviews = require('../controllers/reviews');



router.get('/', (req, res) => res.render('statics/home'));

router.route('/reviews')
  .get(reviews.index);

//show
router.router('/reviews/:id')
  .get(reviews.show);

module.exports = router;
