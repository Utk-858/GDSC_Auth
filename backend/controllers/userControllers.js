const {User} = require('../models/userModel');
const {Project} =  require('../models/userModel');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const nodemailer = require('nodemailer');
require('dotenv').config();



const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error("User Already Exists");
    }

    const user = await User.create({
        name,
        email,
        password,
    });

    if (user) {
        
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
        });
    } else {
        throw new Error('Error occurred');
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            token: generateToken(user._id),
        });
    } else {
        throw new Error('Invalid Credentials!');
    }
});

const projectInfo = asyncHandler(async (req, res) => {
    
    const { projectName, gitRepoLink,email } = req.body;
    // const existingProject = await Project.findOne({ $or: [{ projectName }, { gitRepoLink },{email}] });

    // if (existingProject) {
    //     return res.status(400).json({ message: 'Project with this name or Git repo link already exists.' });
    // }

    const info = await Project.create({
        projectName,
        gitRepoLink,
        email,
    });

    res.json({
        _id: info._id,
        projectName: info.projectName,
        gitRepoLink: info.gitRepoLink,
        email:info.email,
    });
});


const database = asyncHandler(async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});


const deletion = async(req,res) =>{
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
          return res.status(404).send("Project not found");
        }
        res.send("Project deleted successfully");
      } catch (error) {
        res.status(500).send("Failed to delete project");
      }
}

module.exports = { registerUser, authUser, projectInfo ,database,deletion };
