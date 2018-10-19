const Project = require('../models/project');
const User = require('../models/user');
const projectCtrl = {};

projectCtrl.getProjects = async (req, res) => {
    const project = await Project.find();
    res.json(project);
};

projectCtrl.createProject = async (req,res) => {
    const project = new Project({
        name: req.body.name,
        description: req.body.description
    });
    await project.save();
    res.json({
        status: 'Project '+project.name+' saved'
    });
};

projectCtrl.getProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.json(project);
};

projectCtrl.getUsersInCharge = async (req, res) => {
    const { id } = req.params;
    const user = await User.find({projects: id}, {projects: 0});
    res.json(user);
};

projectCtrl.addActivityToProject = async (req,res) => {
    const { id } = req.params;
    const { _id } = req.body;
    await User.findByIdAndUpdate(id, {$addToSet: {activities: _id}});
    res.json({
        status: 'Activity Added to Project'
    });
};

projectCtrl.editProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    project.name = req.body.name;
    project.description = req.body.description;
    project.storename = req.body.storeNumber;
    project.storeNumber = req.body.storeNumber;
    project.m2 = req.body.m2;
    project.location = req.body.location;
    project.localReception = req.body.localReception;
    project.openingDate = req.body.openingDate;
    project.furnitureDate = req.body.furnitureDate;
    await Project.findByIdAndUpdate(id, {$set: newProject}, {new: true});
    res.json({
        status: 'Project '+newProject.name+' Updated'
    });
};

projectCtrl.projectAlerts = async (req, res) => {
    const { id } = req.params;
    const { activated } = req.body;
    const project = await Project.findById(id);
    project.alertsActivated = activated;
    if (activated) {
        res.json({
            status: 'Project Alerts Activated'
        });
    }
    else{
        res.json({
            status: 'Project Alerts Desactivated'
        });
    }
};

projectCtrl.deleteProject = async (req, res) => {
    const { id } = req.params
    const { name } = await Project.findById(id);
    await Project.findByIdAndRemove(id);
    res.json({
        status: 'Project '+name+' Deleted'
    });
};

module.exports = projectCtrl;