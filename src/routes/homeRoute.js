const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

router.get("/", homeController.home);
router.get("/contact", homeController.contact);
router.get("/testimonial", homeController.testimonial);

module.exports = router;