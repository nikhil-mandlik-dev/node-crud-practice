const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const todoRoutes = require("./routes/to-do");
const { mongoConnect } = require("./util/database");

// constants
const PORT = 8080;
const app = express();

// setup views
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware starts here
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", todoRoutes);

mongoConnect(() => {
  app.listen(8080, () => {
    console.log(`started listening on http://localhost:${PORT}`);
  });
});
