const usersRoutes = require("./users");
const reviewsRoutes = require("./reviews")
const tmdbRoutes = require("./tmdb");

const constructorMethod = app => {
    app.use("/users", usersRoutes);
    app.use("/reviews", reviewsRoutes);
    app.use("/", tmdbRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;