const express = require("express");
const router = express.Router();
const data = require("../data");
const reviewsData = data.reviews;

router.post("/write/:movieId", async (req, res) => {
	if(req.cookies.AuthCookie) {
    const newReview = req.body;

    try {
        const { reviewTitle, reviewRating, reviewBody} = newReview;

        await reviewsData.createReview(reviewTitle, reviewBody, reviewRating, req.params.movieId, req.cookies.AuthCookie);

        res.redirect("/movie/" + req.params.movieId);
    } catch (e) {
        res.status(500).json({error: e});
    }
	} else {
		res.status(401);
	}
});

router.get("/edit/:reviewId", async (req, res) => {
    const review = await reviewsData.getReview(req.params.reviewId);

    if (review === null) {
        res.status(404);
    }
	else if(review.author == req.cookies.AuthCookie) {
		res.render("edit-review", {title: "Edit Review", action: "/review/edit/" + review._id, reviewTitle: review.title, reviewRating: review.rating, reviewBody: review.body});
	}

});

router.post("/edit/:reviewId", async (req, res) => {
    const editedReview = req.body;
    try {
        const {reviewTitle, reviewRating, reviewBody} = editedReview;

        const updatedReview = await reviewsData.editReview(req.params.reviewId, reviewTitle, reviewBody, reviewRating);
        const movieId = updatedReview.movie_id;

        res.redirect("/movie/" + movieId);
        
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

router.get("/delete/:reviewId", async (req, res) => {
		const review = await reviewsData.getReview(req.params.reviewId);
		if(req.cookies.AuthCookie == review.author){ 
			const deletedReview = await reviewsData.deleteReview(req.params.reviewId);
			const movieId = deletedReview.movie_id;
			res.redirect("/movie/" + movieId);
		} else {
		res.redirect('back');
		}

});

module.exports = router;