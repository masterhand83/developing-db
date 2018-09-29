const Activity = require('../models/activity');
const activityCtrl = {};

var moment = require('moment');
moment().format();

activityCtrl.getActivities = async (req, res) => {
    const activity = await Activity.find();
    res.json(activity);
};

activityCtrl.createActivitiesForNewProject = async (req,res) => {
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
    activity1 = new Activity({name: "LEVANTAMIENTO FISICO Y FOTOGRAFICO DEL LOCAL", start: now, end: sem1, priority: 0, finished: false});
    activity2 = new Activity({name: "PROYECTO ARQUITECTONICO", start: now, end: sem2, priority: 0, finished: false});
    activity3 = new Activity({name: "PROYECTO ELECTRICO", start: sem1, end: sem2, priority: 0, finished: false});
    activity4 = new Activity({name: "PROYECTO DE AIRE", start: sem1, end: sem2, priority: 0, finished: false});
    activity5 = new Activity({name: "PEDIR CORTINA", start: sem1, end: sem5, priority: 0, finished: false});
    activity6 = new Activity({name: "CONFIRMACION DE PEDIDO Y MEDIDAS DE CANCELES", start: sem1, end: sem5, priority: 0, finished: false});
    activity7 = new Activity({name: "PEDIDO DE LETEROS", start: sem1, end: sem6, priority: 0, finished: false});
    activity8 = new Activity({name: "PEDIDO DE MOBILIARIO", start: sem1, end: sem7, priority: 0, finished: false});
    activity9 = new Activity({name: "COMPRA DE TRANSFORMADOR", start: sem1, end: sem5, priority: 0, finished: false});
    activity10 = new Activity({name: "ANTICIPO A PROVEDORES", start: sem2, end: sem3, priority: 0, finished: false});
    activity11 = new Activity({name: "PEDIDO DE PISO", start: sem2, end: sem4, priority: 0, finished: false});
    activity12 = new Activity({name: "PEDIDO DE LUMINARIAS", start: sem1, end: sem6, priority: 0, finished: false});
    activity13 = new Activity({name: "ENTREGA DE PISO", start: sem3, end: sem4, priority: 0, finished: false});
    activity14 = new Activity({name: "COLOCACION DE PISO", start: sem3, end: sem7, priority: 0, finished: false});
    activity15 = new Activity({name: "LIMPIEZA", start: sem3, end: sem10, priority: 0, finished: false});
    activity16 = new Activity({name: "INSTALACION ELECTRICA", start: sem3, end: sem8, priority: 0, finished: false});
    activity17 = new Activity({name: "GESTORIA ELECTRICA", start: sem3, end: sem10, priority: 0, finished: false});
    activity18 = new Activity({name: "CARPINTERIA", start: sem3, end: sem8, priority: 0, finished: false});
    activity19 = new Activity({name: "TABLAROCA Y PINTURA", start: sem3, end: sem8, priority: 0, finished: false});
    activity20 = new Activity({name: "INSTALACION DE AIRE", start: sem3, end: sem8, priority: 0, finished: false});
    activity21 = new Activity({name: "ENTREGA DE CREMALLERAS", start: sem3, end: sem4, priority: 0, finished: false});
    activity22 = new Activity({name: "ENTREGA DE TIENDA (SUPERVISION)", start: sem3, end: sem10, priority: 0, finished: false});
    activity23 = new Activity({name: "ENTREGA E INSTALACION DE CORTINA", start: sem4, end: sem5, priority: 0, finished: false});
    activity24 = new Activity({name: "INSTALACION DE CANCELES", start: sem4, end: sem7, priority: 0, finished: false});
    activity25 = new Activity({name: "MEDIA TENSION", start: sem4, end: sem7, priority: 0, finished: false});
    activity26 = new Activity({name: "ENTREGA DE LUMINARIAS", start: sem5, end: sem6, priority: 0, finished: false});
    activity27 = new Activity({name: "HERRERIAS", start: sem5, end: sem7, priority: 0, finished: false});
    activity28 = new Activity({name: "LETREROS Y GRAFIOS", start: sem5, end: sem6, priority: 0, finished: false});
    activity29 = new Activity({name: "PLOMERIA", start: sem6, end: sem7, priority: 0, finished: false});
    activity30 = new Activity({name: "BODEGA", start: sem6, end: sem8, priority: 0, finished: false});
    activity31 = new Activity({name: "ENTREGA DE MOBILIARIO METALICO", start: sem6, end: sem8, priority: 0, finished: false});
    activity32 = new Activity({name: "APERTURA", start: sem8, end: sem10, priority: 0, finished: false});
    await activity1.save();
    await activity2.save();
    await activity3.save();
    await activity4.save();
    await activity5.save();
    await activity6.save();
    await activity7.save();
    await activity8.save();
    await activity9.save();
    await activity10.save();
    await activity11.save();
    await activity12.save();
    await activity13.save();
    await activity14.save();
    await activity15.save();
    await activity16.save();
    await activity17.save();
    await activity18.save();
    await activity19.save();
    await activity20.save();
    await activity21.save();
    await activity22.save();
    await activity23.save();
    await activity24.save();
    await activity25.save();
    await activity26.save();
    await activity27.save();
    await activity28.save();
    await activity29.save();
    await activity30.save();
    await activity31.save();
    await activity32.save();
    res.json({
        status: 'Activities saved'
    });
};

activityCtrl.createActivity = async (req,res) => {
    const activity = new Activity(req.body);
    await activity.save();
    res.json({
        status: 'Activity '+activity.name+' saved'
    });
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