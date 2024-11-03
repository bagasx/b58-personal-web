const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");

router.get("/add", projectController.addProject);
router.post("/add", projectController.projectPost);
router.get("/detail/:id", projectController.detailProject);
router.get("/edit/:id", projectController.editProject);
router.post("/edit/:id", projectController.editProjectPost);
router.get("/delete/:id", projectController.deleteProject);

module.exports = router;