const Alert = require('../models/alert');
const alertCtrl = {};

alertCtrl.addAlert = async (data, cb) => {
    const alert = new Alert(data);
    await alert.save();
    cb(alert._id);
};

module.exports = alertCtrl;