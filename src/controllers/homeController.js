const config = require("../../config/config");
const { Sequelize, QueryTypes } = require("sequelize");
const environment = process.env.NODE_ENV
const sequelize = new Sequelize(config[environment]);

const home = async (req, res) => {
  const query = `SELECT projects.*, users.name AS author FROM projects LEFT JOIN users ON projects.author_id = users.id ORDER BY id DESC;`;
  let projects = await sequelize.query(query, { type: QueryTypes.SELECT });
  const authorId = req.session.author
  if (req.session.user) {
    const query = `SELECT projects.*, users.name AS author FROM projects LEFT JOIN users ON projects.author_id = users.id WHERE author_id=${authorId} ORDER BY id DESC;`;
    projects = await sequelize.query(query, { type: QueryTypes.SELECT });
  }

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