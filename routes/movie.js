const express = require("express");
const router = express.Router();
const request = require("request");
const tmdb = require("../config/tmdb")
const apiKey = tmdb.apiKey;
const data = require("../data");
const reviewsData = data.reviews;
const users = data.login;
router.get("/search", (req, res) => {
	if(!req.cookies.AuthCookie){
	    res.redirect("/login");
	} else {
    res.render("search", {title: "Search"});
	}
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

router.post("/:movieId/favorite", async (req,res) => {
	if(!req.cookies.AuthCookie) {
		res.redirect("/login");
	} else {
	res.send(await users.toggleFavorite(req.cookies.AuthCookie, req.params.movieId));
	}
});

router.get("/:movieId", async (req, res) => {
    try {
        const reviews = await reviewsData.getReviews(req.params.movieId);
        
        const url = "https://api.themoviedb.org/3/movie/" + req.params.movieId  + "?api_key=" + apiKey + "&language=en-US";

        await request(url, { json: true }, (error, response, body) => {
            if (error) {
                res.status(400).json({ error: "TMDB could not process the request."});
            }
    
            if (response.statusCode != 200) {
                res.status(response.statusCode).json(body);
            }
    
            else {
                const posterPath = "https://image.tmdb.org/t/p/w500" + body.poster_path;

                res.render("movie", {title: body.title, action: "/review/write/" + req.params.movieId, posterPath: posterPath, reviews: reviews});
            }
    
        });

    } catch (e) {
        res.status(500).json({ error: e });
    }

});

module.exports = router;