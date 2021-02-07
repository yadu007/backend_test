const express = require("express");
const router = express.Router();

const projectController = require('../controllers/projects')
let userHandlers = require('../controllers/users');


router.post("/add_project", userHandlers.loginRequired, projectController.add_project);
router.post("/add_equipment", userHandlers.loginRequired, projectController.add_equipment);
router.post("/remove_equipment", userHandlers.loginRequired, projectController.remove_equipment);
router.post("/get_all_equipments", userHandlers.loginRequired, projectController.get_all_equipments);
router.post("/get_equipment_details", userHandlers.loginRequired, projectController.get_equipment_details);
router.post("/get_all_equipment_types", userHandlers.loginRequired, projectController.get_all_equipment_types);

module.exports = router

