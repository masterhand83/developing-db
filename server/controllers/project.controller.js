const Project = require('../models/project');
const projectCtrl = {};

projectCtrl.getProjects = async (req, res) => {
    const project = await Project.find();
    res.json(project);
};

projectCtrl.createProject = async (req,res) => {
    const project = new Project(req.body);
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

projectCtrl.editProject = async (req, res) => {
    const { id } = req.params;
    const project = {
        name: req.body.name,
        description: req.body.description,
        storeNumber: req.body.storeNumber,
        m2:  req.body.m2,
        location: req.body.location,
        localReception: req.body.localReception,
        openingDate: req.body.openingDate,
        furnitureDate: req.body.furnitureDate
    };
    await Project.findByIdAndUpdate(id, {$set: project}, {new: true});
    res.json({
        status: 'Project '+project.name+' Updated'
    });
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