const Activity = require('../models/activity');
const activityCtrl = {};

activityCtrl.getActivities = async (req, res) => {
    const activity = await Activity.find();
    res.json(activity);
};

activityCtrl.createActivitiesForNewProject = async (req,res) => {
    const date = new Date();
    const newDate = new Date();
    activity1 = new Activity({name: "LEVANTAMIENTO FISICO Y FOTOGRAFICO DEL LOCAL", start: date, end: newDate.setDate(date.getDate()+7)});
    activity2 = new Activity({name: "PROYECTO ARQUITECTONICO", start: date, end: newDate.setDate(date.getDate()+14)});
    activity3 = new Activity({name: "PROYECTO ELECTRICO", start: newDate.setDate(date.getDate()+7), end: newDate.setDate(date.getDate()+14)});
    activity4 = new Activity({name: "PROYECTO DE AIRE", start: newDate.setDate(date.getDate()+7), end: newDate.setDate(date.getDate()+14)});
    activity5 = new Activity({name: "PEDIR CORTINA", start: newDate.setDate(date.getDate()+7), end: newDate.setDate(date.getDate()+35)});
    activity6 = new Activity({name: "CONFIRMACION DE PEDIDO Y MEDIDAS DE CANCELES ", start: newDate.setDate(date.getDate()+7), end: newDate.setDate(date.getDate()+35)});
    activity7 = new Activity({name: "PEDIDO DE LETEROS", start: newDate.setDate(date.getDate()+7), end: newDate.setDate(date.getDate()+42)});
    activity8 = new Activity({name: "PEDIDO DE MOBILIARIO", start: newDate.setDate(date.getDate()+7), end: newDate.setDate(date.getDate()+49)});
    activity9 = new Activity({name: "COMPRA DE TRANSFORMADOR", start: newDate.setDate(date.getDate()+7), end: newDate.setDate(date.getDate()+35)});
    activity10 = new Activity({name: "ANTICIPO A PROVEDORES", start: newDate.setDate(date.getDate()+14), end: newDate.setDate(date.getDate()+21)});
    activity11 = new Activity({name: "PEDIDO DE PISO", start: newDate.setDate(date.getDate()+14), end: newDate.setDate(date.getDate()+28)});
    activity12 = new Activity({name: "PEDIDO DE LUMINARIAS", start: newDate.setDate(date.getDate()+7), end: newDate.setDate(date.getDate()+42)});
    activity13 = new Activity({name: "ENTREGA DE PISO", start: newDate.setDate(date.getDate()+21), end: newDate.setDate(date.getDate()+28)});
    activity14 = new Activity({name: "COLOCACION DE PISO", start: newDate.setDate(date.getDate()+21), end: newDate.setDate(date.getDate()+49)});
    activity15 = new Activity({name: "LIMPIEZA", start: newDate.setDate(date.getDate()+21), end: newDate.setDate(date.getDate()+70)});
    activity16 = new Activity({name: "INSTALACION ELECTRICA", start: newDate.setDate(date.getDate()+21), end: newDate.setDate(date.getDate()+56)});
    activity17 = new Activity({name: "GESTORIA ELECTRICA", start: newDate.setDate(date.getDate()+21), end: newDate.setDate(date.getDate()+70)});
    activity18 = new Activity({name: "CARPINTERIA", start: newDate.setDate(date.getDate()+21), end: newDate.setDate(date.getDate()+56)});
    activity19 = new Activity({name: "TABLAROCA Y PINTURA", start: newDate.setDate(date.getDate()+21), end: newDate.setDate(date.getDate()+56)});
    activity20 = new Activity({name: "INSTALACION DE AIRE", start: newDate.setDate(date.getDate()+21), end: newDate.setDate(date.getDate()+56)});
    activity21 = new Activity({name: "ENTREGA DE CREMALLERAS", start: newDate.setDate(date.getDate()+21), end: newDate.setDate(date.getDate()+28)});
    activity22 = new Activity({name: "ENTREGA DE TIENDA (SUPERVISION)", start: newDate.setDate(date.getDate()+21), end: newDate.setDate(date.getDate()+70)});
    activity23 = new Activity({name: "ENTREGA E INSTALACION DE CORTINA", start: newDate.setDate(date.getDate()+28), end: newDate.setDate(date.getDate()+35)});
    activity24 = new Activity({name: "INSTALACION DE CANCELES", start: newDate.setDate(date.getDate()+28), end: newDate.setDate(date.getDate()+49)});
    activity25 = new Activity({name: "MEDIA TENSION", start: newDate.setDate(date.getDate()+28), end: newDate.setDate(date.getDate()+49)});
    activity26 = new Activity({name: "ENTREGA DE LUMINARIAS", start: newDate.setDate(date.getDate()+35), end: newDate.setDate(date.getDate()+42)});
    activity27 = new Activity({name: "HERRERIAS", start: newDate.setDate(date.getDate()+35), end: newDate.setDate(date.getDate()+49)});
    activity28 = new Activity({name: "LETREROS Y GRAFIOS", start: newDate.setDate(date.getDate()+35), end: newDate.setDate(date.getDate()+42)});
    activity29 = new Activity({name: "PLOMERIA", start: newDate.setDate(date.getDate()+42), end: newDate.setDate(date.getDate()+49)});
    activity30 = new Activity({name: "BODEGA", start: newDate.setDate(date.getDate()+42), end: newDate.setDate(date.getDate()+56)});
    activity31 = new Activity({name: "ENTREGA DE MOBILIARIO METALICO", start: newDate.setDate(date.getDate()+42), end: newDate.setDate(date.getDate()+56)});
    activity32 = new Activity({name: "APERTURA", start: newDate.setDate(date.getDate()+56), end: newDate.setDate(date.getDate()+70)});
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
        objective: req.body.objective,
        deliverable: req.body.deliverable
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