const config = require("../config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

const home = async (req, res) => {
  const query = `SELECT projects.*, users.name AS author FROM projects LEFT JOIN users ON projects.author_id = users.id ORDER BY id DESC;`;
  const projects = await sequelize.query(query, { type: QueryTypes.SELECT });
  const authorId = req.session.author
  const authorProject = projects.filter(project => {
    return project.author_id == authorId;
  })
  console.log(authorProject);

  // console.log(authorProject)
  res.render("index", {
    title: "Home",
    projects,
    home: true,
    user: req.session.user
  });
}

const contact = (req, res) => {
  res.render("contact", {
    title: "Contact",
    user: req.session.user
  });
}

const testimonial = (req, res) => {
  res.render("testimonial", {
    title: "Testimonial",
    testimonials: true,
    user: req.session.user
  });
}

module.exports = {
  home, contact, testimonial
};