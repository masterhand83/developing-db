const Comment = require('../models/comment');
const commentCtrl = {};

var moment = require('moment');
moment().format();

commentCtrl.addComment = async (data, cb) => {
    var date = moment();
    data.date = date;
    const comment = new Comment(data);
    await comment.save();
    cb(comment._id);
};

module.exports = commentCtrl;