const usersRoutes = require("./users");
const reviewsRoutes = require("./reviews")
const movieRoutes = require("./movie");

const constructorMethod = app => {
    app.use("/user", usersRoutes);
    app.use("/review", reviewsRoutes);
    app.use("/movie", movieRoutes)

    // App defaults to the search page
    app.get("/", (req, res) => {
        res.redirect("/movie/search");
    });

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;