const express = require("express");
const router = express.Router();
const request = require("request");
const tmdb = require("../config/tmdb")
const apiKey = tmdb.apiKey;

router.get("/search", (req, res) => {
    res.render("forms/search", {title: "Search"});
});

router.post("/search", async (req, res) => {
    const input = req.body;
    const query = input.query; // Checked to make sure not null on client side, see search.js

    const url = "https://api.themoviedb.org/3/search/movie?api_key=" + apiKey + "&language=en-US&query=" + query + "&page=1&include_adult=false";

    await request(url, { json: true }, (error, response, body) => {
        if (error) {
            res.status(400).json({ error: "TMDB could not process the request."});
        }

        if (response.statusCode != 200) {
            res.status(response.statusCode).json(body);
        }

        else {
            res.render("results", {title: "Results", results: body.results});
        }

    });

});

module.exports = router;