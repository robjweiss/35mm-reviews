const usersRoutes = require("./users");
const reviewsRoutes = require("./reviews");
const movieRoutes = require("./movie");
const loginRoutes = require("./login");
const registerRoutes = require("./register");
const constructorMethod = app => {
    app.use("/user", usersRoutes);
    app.use("/review", reviewsRoutes);
    app.use("/movie", movieRoutes)
	app.use("/login", loginRoutes)
	app.use("/register", registerRoutes)
    // App defaults to the search page
    app.get("/", (req, res) => {
        res.redirect("/movie/search");
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;