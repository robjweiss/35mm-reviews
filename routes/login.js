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
	flag = true;
	if(!username || !password) {
		flag = false;
	}
	if(!flag) {
		res.render("login", {title: "Login"});
	}

	userCheck = await users.getUser(username);

	if(userCheck) {
		bcrypt.compare(req.body.password, userCheck.password, function(err, result) {
    if(!result){
		res.render("login", {title: "Login", flag: false});
    } else {
        res.cookie("AuthCookie", username);
        res.redirect('movie/search');
      }
    });
	} else {
		res.render("login", {title: "Login", flag: false});
	}
});

router.get("/", async (req, res) => {
	if(!req.cookies.AuthCookie) {
    res.render("login", {title: "Login"});
	} else {
		res.redirect('movie/search');
	}
});


module.exports = router;