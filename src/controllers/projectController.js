const config = require("../config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

const addProject = (req, res) => {
  res.render("add-project", {
    title: "Add Project",
    activeAddProject: true,
  });
}

const projectPost = async (req, res) => {
  const { name, startDate, endDate, description, technologies } = req.body;
  const query = `INSERT INTO projects(name,start_date,end_date,description,technologies,image) VALUES('${name}','${startDate}','${endDate}','${description}','{${technologies}}','https://essential-addons.com/wp-content/uploads/2023/12/image-2.jpeg')`;
  await sequelize.query(query, { type: QueryTypes.INSERT });

  res.render("add-project", { success: true });
}

const detailProject = async (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM projects WHERE id = ${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("detail-project", {
    title: "Detail Project",
    project: project[0],
  });
}

const editProject = async (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM projects WHERE id=${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("edit-project", {
    title: "Edit Project",
    project: project[0],
  });
}

const editProjectPost = async (req, res) => {
  const { id } = req.params;

  const { name, startDate, endDate, description, technologies } = req.body;

  const query = `UPDATE projects SET name='${name}',start_date='${startDate}',end_date='${endDate}',description='${description}',technologies='{${technologies}}' WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.UPDATE });
  res.redirect("/");
}

const deleteProject = async (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM projects WHERE id=${id}`;
  await sequelize.query(query, { type: QueryTypes.DELETE });

  res.redirect("/");
}

module.exports = {
  addProject, projectPost, detailProject, editProject, editProjectPost, deleteProject
}
