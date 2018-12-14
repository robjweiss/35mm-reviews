const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const reviewsData = data.reviews;

async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    try {
        await reviewsData.createReview("The Best Movie Ever", "This movie was so good", "5", "181808"); // Star Wars: The Last Jedi
        await reviewsData.createReview("The Worst Movie I've Ever Seen", "This movie was so bad", "1", "181808"); // Star Wars: The Last Jedi
    } catch (e) {
        console.log("Error seeding database:");
        console.log(e);
    }

    console.log("Database Seeded");
    await db.serverConfig.close();
}

main();