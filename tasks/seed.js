const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const reviewsData = data.reviews;
const userData = data.login;
const uuid = uuidv4();
async function main() {
    const db = await dbConnection();
    await db.dropDatabase();

    try {
		await userData.createUser("Kevin", "$2a$16$4o0WWtrq.ZefEmEbijNCGukCezqWTqz1VWlPm/xnaLM8d3WlS5pnK", [7459], "1245325124124"); //quidditch is password ;)
		await userData.createUser("Rob", "$2a$16$7JKSiEmoP3GNDSalogqgPu0sUbwder7CAN/5wnvCWe6xCKAKwlTD.", [181808], "723445325124124"); //elementarymydearwatson is password ;)
        await reviewsData.createReview("The Best Movie Ever", "This movie was so good", "5", "181808", "Kevin"); // Star Wars: The Last Jedi
        await reviewsData.createReview("The Worst Movie I've Ever Seen", "This movie was so bad", "1", "181808", "Rob"); // Star Wars: The Last Jedi
    } catch (e) {
        console.log("Error seeding database:");
        console.log(e);
    }

    console.log("Database Seeded");
    await db.serverConfig.close();
}

main();