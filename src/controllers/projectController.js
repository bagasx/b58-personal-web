const config = require("../config/config.json");
const { Sequelize, QueryTypes } = require("sequelize");
const sequelize = new Sequelize(config.development);

const addProject = (req, res) => {
  res.render("add-project", {
    title: "Add Project",
    addProject: true,
    user: req.session.user
  });
}

const projectPost = async (req, res) => {
  try {
    const { name, startDate, endDate, description, technologies } = req.body;
    const { id } = req.session.user;
    const imagePath = req.file.path;
    const query = `INSERT INTO projects(name,start_date,end_date,description,technologies,image,author_id) VALUES('${name}','${startDate}','${endDate}','${description}','{${technologies}}','${imagePath}','${id}')`;
    await sequelize.query(query, { type: QueryTypes.INSERT });
    req.flash("success", "Project added successfully!");
    res.render("add-project", { user: req.session.user });
  } catch (err) {
    req.flash("error", "Project failed to add!");
    res.render("add-project");
  }
}

const detailProject = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT id, name, 
    TO_CHAR(start_date, 'DD Mon YYYY') as start_date, 
    TO_CHAR(end_date, 'DD Mon YYYY') as end_date, 
    description, technologies, image 
    FROM projects WHERE id=${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });

  res.render("detail-project", {
    title: "Detail Project",
    project: project[0],
    user: req.session.user
  });
}

const editProject = async (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT id, name, 
    TO_CHAR(start_date, 'YYYY-MM-DD') as start_date, 
    TO_CHAR(end_date, 'YYYY-MM-DD') as end_date, 
    description, technologies, image 
    FROM projects WHERE id=${id}`;
  const project = await sequelize.query(query, { type: QueryTypes.SELECT });
  let imagePath = project[0].image;

  if (req.file) {
    imagePath = req.file.path
  }

  res.render("edit-project", {
    title: "Edit Project",
    project: project[0],
    image: imagePath,
    user: req.session.user
  });
}

const editProjectPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, startDate, endDate, description, technologies } = req.body;
    // get existing image url
    const querySelect = `SELECT * from projects WHERE id = ${id}`
    const project = await sequelize.query(querySelect, { type: QueryTypes.SELECT });
    let imagePath = project[0].image
    // check if upload new image
    if (req.file) {
      imagePath = req.file.path
    }
    const queryUpdate = `UPDATE projects SET name='${name}',start_date='${startDate}',end_date='${endDate}',description='${description}',technologies='{${technologies}}',image='${imagePath}' WHERE id=${id}`;
    await sequelize.query(queryUpdate, { type: QueryTypes.UPDATE });
    req.flash("success", "Project edited successful!");
    res.redirect("/");
  } catch (err) {
    req.flash("error", "Failed to edit project");
    res.redirect(`/`);
  }
}

const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM projects WHERE id=${id}`;
    await sequelize.query(query, { type: QueryTypes.DELETE });

    req.flash("success", "Project deleted successfully!");
    res.redirect("/");
  } catch (err) {
    req.flash("error", "Failed to delete project!");
    res.redirect("/");
  }
}

module.exports = {
  addProject, projectPost, detailProject, editProject, editProjectPost, deleteProject
}
