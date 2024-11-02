const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const port = 3000;
const config = require("./src/config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);
require("./src/helpers/helper");

app.set("view engine", "hbs");

hbs.registerPartials(path.join(__dirname, "./src/views/partials"));

hbs.registerHelper("isExist", function (array, value) {
  return array.includes(value);
});

app.set("views", path.join(__dirname, "./src/views"));
app.use("/assets", express.static("./src/assets"));

app.use(express.urlencoded({ extended: true }));

// Routing
app.get("/", home);
app.get("/contact", contact);
app.get("/testimonial", testimonial);
app.get("/add-project", addProject);
app.post("/add-project", projectPost);
app.get("/detail-project/:id", detailProject);
app.get("/edit-project/:id", editProject);
app.post("/edit-project/:id", editProjectPost);
app.get("/delete-project/:id", deleteProject);

async function home(req, res) {
  const query = `SELECT * FROM projects ORDER BY id DESC`;
  const projects = await sequelize.query(query, { type: QueryTypes.SELECT });
  res.render("index", {
    title: "Home",
    projects,
    activeHome: true,
  });
}

function contact(req, res) {
  res.render("contact", {
    title: "Contact",
  });
}

function testimonial(req, res) {
  res.render("testimonial", {
    title: "Testimonial",
    activeTestimonial: true,
  });
}

function addProject(req, res) {
  res.render("add-project", {
    title: "Add Project",
    activeAddProject: true,
  });
}

async function projectPost(req, res) {
  const { name, startDate, endDate, description, technologies } = req.body;
  const query = `INSERT INTO projects(name,start_date,end_date,description,technologies,image) VALUES('${name}','${startDate}','${endDate}','${description}','{${technologies}}','https://essential-addons.com/wp-content/uploads/2023/12/image-2.jpeg')`;
  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.render("add-project", { success: true });
}

async function detailProject(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM projects WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("detail-project", {
    title: "Detail Project",
    project: project[0],
  });
}

async function editProject(req, res) {
  const { id } = req.params;

  const query = `SELECT * FROM projects WHERE id=${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("edit-project", {
    title: "Edit Project",
    project: project[0],
  });
}

async function editProjectPost(req, res) {
  const { id } = req.params;

  const { name, startDate, endDate, description, technologies } = req.body;

  const query = `UPDATE projects SET name='${name}',start_date='${startDate}',end_date='${endDate}',description='${description}',technologies='{${technologies}}' WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });
  res.redirect("/");
}

async function deleteProject(req, res) {
  const { id } = req.params;

  const query = `DELETE FROM projects WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.DELETE });

  res.redirect("/");
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
