const config = require("../config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);
const bcrypt = require("bcrypt");

// Register
const register = (req, res) => {
  res.render("register");
}

const registerPost = async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `INSERT INTO users(name, email, password) VALUES('${name}', '${email}', '${hashedPassword}')`;
  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.redirect("login");
}

// Login
const login = (req, res) => {
  res.render("login");
}

const loginPost = async (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT * FROM users WHERE email='${email}'`;
  const user = await sequelize.query(query, { type: QueryTypes.SELECT });
  if (!user.length) {
    req.flash("error", "Incorrect email or password!");
    return res.redirect("/login");
  }

  const passwordValidation = await bcrypt.compare(password, user[0].password);
  if (!passwordValidation) {
    req.flash("error", "Incorrect email or password!");
    return res.redirect("/login");
  }

  req.flash("welcome", "Hello");
  req.session.user = user[0];

  res.redirect("/");
}

// Logout
const logout = (req, res) => {
  req.session.destroy();

  res.redirect("/");
};

module.exports = {
  login, loginPost, register, registerPost, logout
}