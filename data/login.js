const uuidv4 = require("uuid/v4");
const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const bcrypt = require("bcrypt");

module.exports = {
    async createUser(username, password) {
        const usersCollection = await users();
        
        const uuid = uuidv4();
        bcrypt.hash(password, 10, async function(err, hash) {
	
			const newUser = {
            "username" : username,
            "password" : hash,
            "_id" : uuid
			}

			const insertInfo = await usersCollection.insertOne(newUser);
			if (insertInfo.insertedCount === 0) throw "Could not create review";
		});
    },

    async getUser(username) {
        if (!username) throw "a username must be provided";

        const usersCollection = await users();

        const usersArray = await usersCollection.findOne( {username: username} );
		
        return await usersArray;
    },

}