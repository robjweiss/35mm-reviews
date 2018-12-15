const uuidv4 = require("uuid/v4");
const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;

module.exports = {
    async createReview(title, body, rating, movieId, owner) {
        if (rating === NaN) throw "rating must be a number"; // Might do this check client side

        const reviewsCollection = await reviews();
        
        const uuid = uuidv4();
        
        const newReview = {
            "title" : title,
            "body" : body,
            "rating" : rating,
            "movie_id" : movieId,
            "_id" : uuid, 
			"author": owner
        }

        const insertInfo = await reviewsCollection.insertOne(newReview);
        if (insertInfo.insertedCount === 0) throw "Could not create review";

    },

    async getReviews(movieId) {
        if (!movieId) throw "a movie ID must be provided";
        if (movieId === NaN) throw "movie ID must be a number";

        const reviewsCollection = await reviews();

        const reviewsArray = await reviewsCollection.find( {movie_id: movieId} ).toArray();

        return reviewsArray;
    },

    async getReview(reviewId) {
        if (!reviewId) throw "a review ID must be provided";

        const reviewsCollection = await reviews();

        const review = await reviewsCollection.findOne( {_id: reviewId} );

        return review;
    },

    async editReview(reviewId, title, body, rating) {
        if (!reviewId) throw "a review ID must be provided";
        if (!title) throw "review must have a title";
        if (!body) throw "review must have a body";
        if (!rating) throw "review must have a rating";

        const reviewsCollection = await reviews();

        await reviewsCollection.updateOne( {_id: reviewId}, {$set: {title: title, body: body, rating: rating}} );

        return await this.getReview(reviewId);

    },

    async deleteReview(reviewId) {
        if (!reviewId) throw "a review ID must be provided";

        const reviewsCollection = await reviews();

        const review = await this.getReview(reviewId);

        const deletionInfo = await reviewsCollection.removeOne( {_id: reviewId} );
        if (deletionInfo.deletedCount === 0) throw "could not delete review";

        return review;
    }
}