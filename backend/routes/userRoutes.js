const express = require("express");
const {registerUser} = require("../controllers/userControllers")
const {authUser} = require("../controllers/userControllers")
const {projectInfo} = require("../controllers/userControllers")

const router = express.Router();

router.route('/').post(registerUser);
router.route('/login').post(authUser);
router.route('/dashboard').post(projectInfo);


module.exports = router