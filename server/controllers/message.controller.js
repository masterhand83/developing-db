const Message = require('../models/message');
const messageCtrl = {};

var moment = require('moment');
moment().format();

messageCtrl.addMessage = async (data, cb) => {
    var date = moment();
    data.date = date;
    const message = new Message(data);
    await message.save();
    cb(message._id);
};

messageCtrl.deleteMessages = async (id) => {
    await Message.findByIdAndDelete(id);
};

module.exports = messageCtrl;