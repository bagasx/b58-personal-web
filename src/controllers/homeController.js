const config = require("../config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

const home = async (req, res) => {
  const query = `SELECT * FROM projects ORDER BY id DESC`;
  const projects = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("index", {
    title: "Home",
    projects,
    activeHome: true,
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
    activeTestimonial: true,
    user: req.session.user
  });
}

module.exports = {
  home, contact, testimonial
};