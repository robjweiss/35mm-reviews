const uuidv4 = require("uuid/v4");
const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;

module.exports = {
    async createReview(title, body, rating, movieId) {
        if (rating === NaN) throw "rating must be a number"; // Might do this check client side

        const reviewsCollection = await reviews();
        
        const uuid = uuidv4();
        
        const newReview = {
            "title" : title,
            "body" : body,
            "rating" : rating,
            "movie_id" : movieId,
            "_id" : uuid
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
    }
}