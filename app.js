const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
// Routes
const homeRoute = require("./src/routes/homeRoute.js")
const projectRoute = require("./src/routes/projectRoute.js")

// Handlebars
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "./src/views/partials"));
require("./src/helpers/helper");

// app settings
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/views"));
app.use("/assets", express.static("./src/assets"));
app.use(express.urlencoded({ extended: true }));

// Url Handling
app.use("/", homeRoute)
app.use("/project", projectRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
