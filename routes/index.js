const usersRoutes = require("./users");
const reviewsRoutes = require("./reviews")

const constructorMethod = app => {
    app.use("/users", usersRoutes);
    app.use("/reviews", reviewsRoutes);

    app.use("*", (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;