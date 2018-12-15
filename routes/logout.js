const express = require("express");
const router = express.Router();
const request = require("request");
const tmdb = require("../config/tmdb")
const apiKey = tmdb.apiKey;
const data = require("../data");
const reviewsData = data.reviews;
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");

router.get("/", (req,res) => {
	res.clearCookie("AuthCookie");
	res.redirect("/")
})

module.exports = router;