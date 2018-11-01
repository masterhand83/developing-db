const Project = require('../models/project');
const User = require('../models/user');
const activityCtrl = require('../controllers/activity.controller');
const userCtrl = require('../controllers/user.controller');
const messageCtrl = require('../controllers/message.controller');
const projectCtrl = {};

var moment = require('moment');
moment().format();

projectCtrl.getProjects = async (req, res) => {
    const projects = await Project.find().lean();
    var i = 0;
    for (var item of projects) {
        i++;
        const { name } = await User.findOne({projects: item._id, userType: 2}).lean();
        item.resident = name;
    }
    res.json(projects);
};

projectCtrl.createProject = async (req,res) => {
    const project = new Project({
        name: req.body.name,
        description: req.body.description
    });
    const { idUser1 } = req.body;
    const { idUser2 } = req.body;
    const { idUser3 } = req.body;
    await project.save()
        .then(function () {
            activityCtrl.createActivitiesForNewProject(project._id);
            userCtrl.addProjectToUser(idUser1,project._id);
            userCtrl.addProjectToUser(idUser2,project._id);
            userCtrl.addProjectToUser(idUser3,project._id);
            res.json({
                status: 'Project '+project.name+' saved'
            });
        })
        .catch(function (err) {
            console.log(err);
            res.json({
                status: 'Project '+project.name+' failed'
            });
        });
};

projectCtrl.getProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    res.json(project);
};

projectCtrl.changeResidentInCharge = async (req, res) => {
    const { id } = req.params;
    const { idNewResident } = req.body;
    await User.findOneAndUpdate({projects: id, userType: 2},{$pull: {projects: id}})
        .then(function () {
            userCtrl.addProjectToUser(idNewResident,id);
            res.json({
                status: 'Resident changed'
            });
        })
        .catch(function () {
            res.json({
                status: 'Change Failed'
            });
        });
};

projectCtrl.changeDesignerInCharge = async (req, res) => {
    const { id } = req.params;
    const { idNewDesigner } = req.body;
    await User.findOneAndUpdate({projects: id, userType: 3},{$pull: {projects: id}})
        .then(function () {
            userCtrl.addProjectToUser(idNewDesigner,id);
            res.json({
                status: 'Designer changed'
            });
        })
        .catch(function () {
            res.json({
                status: 'Change Failed'
            });
        });
};

projectCtrl.addActivityToProject = async (req,res) => {
    const { id } = req.params;
    activityCtrl.createActivity(req.body,async (cb) => {
        await Project.findByIdAndUpdate(id, {$addToSet: {activities: cb}});
    });
    res.json({
        status: 'Activity Added to Project'
    });
};

projectCtrl.getActivitiesProject = async (req, res) => {
    const { id } = req.params;
    const { activities } = await Project.findById(id,{activities: -1, _id: 0}).populate('activities').exec();
    var GanttData = new Array();
    var num = 0;
    activities.forEach(element => {
        num++;
        var activity = { id: element._id, name: num, series: [
            { name: element.name, start: new Date(element.start), end: new Date(element.end), color: "#52FF33"}
        ]};
        GanttData.push(activity);
    });
    res.json(GanttData);
};

projectCtrl.editProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    var localReception = moment(req.body.localReception);
    var openingDate = moment(req.body.openingDate);
    var furnitureDate = moment(req.body.furnitureDate);
    project.name = req.body.name;
    project.description = req.body.description;
    project.storeName = req.body.storeName;
    project.storeNumber = req.body.storeNumber;
    project.m2 = req.body.m2;
    project.location = req.body.location;
    project.localReception = localReception;
    project.openingDate = openingDate;
    project.furnitureDate = furnitureDate;
    await Project.findByIdAndUpdate(id, {$set: project}, {new: true});
    res.json({
        status: 'Project '+project.name+' Updated'
    });
};

projectCtrl.activateProjectAlerts = async (req, res) => {
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

projectCtrl.addMessageToProject = async (req,res) => {
    const { id } = req.params;
    messageCtrl.addMessage(req.body, async(cb) => {
        await  Project.findByIdAndUpdate(id, {$addToSet: {messages: cb}});
    });
    res.json({
        status: 'Message Added to Project'
    });
};

projectCtrl.getMessagesProject = async (req, res) => {
    const { id } = req.params;
    const { messages } = await Project.findById(id).populate('messages').exec();
    res.json(messages);
};

projectCtrl.getAlertsProject = async (req, res) => {
    const { id } = req.params;
    const project = await Project.findById(id).populate('alerts').exec();
    res.json(project);
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