const Activity = require('../models/activity');
const Project = require('../models/project');
const activityCtrl = {};

var moment = require('moment');
moment().format();

activityCtrl.getActivities = async (req, res) => {
    const activity = await Activity.find();
    res.json(activity);
};

activityCtrl.createActivitiesForNewProject = async (id) => {
    var now = moment();
    var sem1 = moment().add(1, 'w');
    var sem2 = moment().add(2, 'w');
    var sem3 = moment().add(3, 'w');
    var sem4 = moment().add(4, 'w');
    var sem5 = moment().add(5, 'w');
    var sem6 = moment().add(6, 'w');
    var sem7 = moment().add(7, 'w');
    var sem8 = moment().add(8, 'w');
    var sem10 = moment().add(10, 'w');
    var activitiesId = new Array();
    var activities = new Array(
        new Activity({name: "LEVANTAMIENTO FISICO Y FOTOGRAFICO DEL LOCAL", start: now, end: sem1, priority: 0, finished: false}),
        new Activity({name: "PROYECTO ARQUITECTONICO", start: now, end: sem2, priority: 0, finished: false}),
        new Activity({name: "PROYECTO ELECTRICO", start: sem1, end: sem2, priority: 0, finished: false}),
        new Activity({name: "PROYECTO DE AIRE", start: sem1, end: sem2, priority: 0, finished: false}),
        new Activity({name: "PEDIR CORTINA", start: sem1, end: sem5, priority: 0, finished: false}),
        new Activity({name: "CONFIRMACION DE PEDIDO Y MEDIDAS DE CANCELES", start: sem1, end: sem5, priority: 0, finished: false}),
        new Activity({name: "PEDIDO DE LETEROS", start: sem1, end: sem6, priority: 0, finished: false}),
        new Activity({name: "PEDIDO DE MOBILIARIO", start: sem1, end: sem7, priority: 0, finished: false}),
        new Activity({name: "COMPRA DE TRANSFORMADOR", start: sem1, end: sem5, priority: 0, finished: false}),
        new Activity({name: "ANTICIPO A PROVEDORES", start: sem2, end: sem3, priority: 0, finished: false}),
        new Activity({name: "PEDIDO DE PISO", start: sem2, end: sem4, priority: 0, finished: false}),
        new Activity({name: "PEDIDO DE LUMINARIAS", start: sem1, end: sem6, priority: 0, finished: false}),
        new Activity({name: "ENTREGA DE PISO", start: sem3, end: sem4, priority: 0, finished: false}),
        new Activity({name: "COLOCACION DE PISO", start: sem3, end: sem7, priority: 0, finished: false}),
        new Activity({name: "LIMPIEZA", start: sem3, end: sem10, priority: 0, finished: false}),
        new Activity({name: "INSTALACION ELECTRICA", start: sem3, end: sem8, priority: 0, finished: false}),
        new Activity({name: "GESTORIA ELECTRICA", start: sem3, end: sem10, priority: 0, finished: false}),
        new Activity({name: "CARPINTERIA", start: sem3, end: sem8, priority: 0, finished: false}),
        new Activity({name: "TABLAROCA Y PINTURA", start: sem3, end: sem8, priority: 0, finished: false}),
        new Activity({name: "INSTALACION DE AIRE", start: sem3, end: sem8, priority: 0, finished: false}),
        new Activity({name: "ENTREGA DE CREMALLERAS", start: sem3, end: sem4, priority: 0, finished: false}),
        new Activity({name: "ENTREGA DE TIENDA (SUPERVISION)", start: sem3, end: sem10, priority: 0, finished: false}),
        new Activity({name: "ENTREGA E INSTALACION DE CORTINA", start: sem4, end: sem5, priority: 0, finished: false}),
        new Activity({name: "INSTALACION DE CANCELES", start: sem4, end: sem7, priority: 0, finished: false}),
        new Activity({name: "MEDIA TENSION", start: sem4, end: sem7, priority: 0, finished: false}),
        new Activity({name: "ENTREGA DE LUMINARIAS", start: sem5, end: sem6, priority: 0, finished: false}),
        new Activity({name: "HERRERIAS", start: sem5, end: sem7, priority: 0, finished: false}),
        new Activity({name: "LETREROS Y GRAFIOS", start: sem5, end: sem6, priority: 0, finished: false}),
        new Activity({name: "PLOMERIA", start: sem6, end: sem7, priority: 0, finished: false}),
        new Activity({name: "BODEGA", start: sem6, end: sem8, priority: 0, finished: false}),
        new Activity({name: "ENTREGA DE MOBILIARIO METALICO", start: sem6, end: sem8, priority: 0, finished: false}),
        new Activity({name: "APERTURA", start: sem8, end: sem10, priority: 0, finished: false})
    );
    activities.forEach(async (element) => {
        await element.save();
        await Project.findByIdAndUpdate(id, {$addToSet: {activities: element._id}});
    });
};

activityCtrl.createActivity = async (data,cb) => {
    var start = moment(data.start);
    var end = moment(data.end);
    data.start = start;
    data.end = end;
    const activity = new Activity(data);
    await activity.save();
    cb(activity._id);
};

activityCtrl.getActivity = async (req, res) => {
    const { id } = req.params;
    const activity = await Activity.findById(id);
    res.json(activity);
};

activityCtrl.editActivity = async (req, res) => {
    const { id } = req.params;
    const activity = {
        name: req.body.name,
        description: req.body.description,
        start: req.body.start,
        end: req.body.end,
        priority: req.body.priority,
        objective: req.body.objective,
        deliverable: req.body.deliverable,
        finished: req.body.finished
    };
    await Activity.findByIdAndUpdate(id, {$set: activity}, {new: true});
    res.json({
        status: 'Activity '+activity.name+' Updated'
    });
};

activityCtrl.deleteActivity = async (req, res) => {
    const { id } = req.params
    const { name } = await Activity.findById(id);
    await Activity.findByIdAndRemove(id);
    res.json({
        status: 'Activity '+name+' Deleted'
    });
};

module.exports = activityCtrl;