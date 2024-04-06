const express = require('express');
const passport = require('passport');

const router = express.Router();

const assignWork = require('../controllers/review_controller');

router.get('/assignWork',passport.restrictAccessPages, assignWork.home);
router.post('/createReview', assignWork.createReview);

module.exports = router;