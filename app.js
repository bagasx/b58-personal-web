const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const session = require("express-session");
const flash = require("express-flash");

// routes
const homeRoute = require("./src/routes/homeRoute.js")
const projectRoute = require("./src/routes/projectRoute.js")
const authRoute = require("./src/routes/authRoute.js")

// handlebars
const hbs = require("hbs");
hbs.registerPartials(path.join(__dirname, "./src/views/partials"));
require("./src/helpers/helper");

// app settings
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./src/views"));
app.use("/assets", express.static("./src/assets"));
app.use("/uploads", express.static("./uploads"));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    name: "my-session",
    secret: "sicmundus",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24
    },
  })
);

app.use(flash());

// url handling
app.use("/", homeRoute, authRoute)
app.use("/project", projectRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
