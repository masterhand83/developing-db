const Alert = require('../models/alert');
const Project = require('../models/project');
const alertCtrl = {};

var moment = require('moment');
moment().format();

alertCtrl.addAlert = async (data, cb) => {
    var date = moment();
    data.date = date;
    const alert = new Alert(data);
    await alert.save();
    cb(alert._id);
};

alertCtrl.deleteAlert = async (req, res) => {
    const { id } = req.params;
    await Project.findOneAndUpdate({alerts: id}, {$pull: {alerts: id}});
    await Alert.findByIdAndDelete(id);
    res.json({
        status: 'Alert Deleted'
    });
};

alertCtrl.deleteAlerts = async (id) => {
    await Alert.findByIdAndRemove(id);
};

module.exports = alertCtrl;