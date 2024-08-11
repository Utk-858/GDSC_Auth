const express = require("express");
const {registerUser} = require("../controllers/userControllers")
const {authUser} = require("../controllers/userControllers")
const {projectInfo} = require("../controllers/userControllers")
const {database} = require("../controllers/userControllers")
const {deletion} = require("../controllers/userControllers")


const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/dashboard').post(projectInfo);
router.route('/projects').get(database);
router.route('/projects/:id').delete(deletion);


module.exports = router;