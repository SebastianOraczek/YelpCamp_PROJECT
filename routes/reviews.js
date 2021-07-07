const express = require("express");
const router = express.Router({ mergeParams: true });

const { validateRating, isLoggedIn, isReviewAuthor } = require("../middlewares");
const reviews = require("../controllers/reviews");

router.post("/", validateRating, isLoggedIn, reviews.createReview);
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, reviews.deleteReview);

module.exports = router;