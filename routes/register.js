const express = require("express");
const router = express.Router();
const request = require("request");
const tmdb = require("../config/tmdb")
const apiKey = tmdb.apiKey;
const data = require("../data");
const users = data.login;
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	if(!username || !password) {
		res.render("register", {title: "Register", error: 466});
	}

	if(await users.getUser(username) != null) {
		res.render("register", {title: "Register", error: 467});
	} else {
		await users.createUser(username, password);
        res.redirect("/movie/search");
	}
});

router.get("/", (req, res) => {
	if(!req.cookies.AuthCookie) {
		res.render("register", {title: "Register"});
	} else {
		res.redirect('movie/search');
	}
});


module.exports = router;