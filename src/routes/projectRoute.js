const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const upload = require("../middlewares/upload-file");
const urlBlocking = require("../middlewares/url-blocking");

router.get("/add", urlBlocking, projectController.addProject);
router.post("/add", urlBlocking, upload.single("image"), projectController.projectPost);
router.get("/detail/:id", projectController.detailProject);
router.get("/edit/:id", urlBlocking, projectController.editProject);
router.post("/edit/:id", urlBlocking, upload.single("image"), projectController.editProjectPost);
router.get("/delete/:id", urlBlocking, projectController.deleteProject);

module.exports = router;