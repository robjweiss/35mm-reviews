const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const cookie = require("cookie-parser");
const bcrypt = require("bcrypt");
const configRoutes = require("./routes");
const app = express();
const PORT = "3000"
const static = express.static(__dirname + "/public");

app.use("/public", static);
app.use(cookie());
app.use(bodyParser.urlencoded()); // May or may not end up being used

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(bodyParser.json());
configRoutes(app);


app.listen(PORT, () => {
  console.log("Express server running at http://localhost:" + PORT);
});