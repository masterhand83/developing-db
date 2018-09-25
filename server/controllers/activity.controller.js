const Activity = require('../models/activity');
const activityCtrl = {};

activityCtrl.getActivities = async (req, res) => {
    const activity = await Activity.find();
    res.json(activity);
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