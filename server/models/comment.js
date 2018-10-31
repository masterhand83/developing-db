const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentSchema = new Schema({
    authorName: { type: String, required: true },
    comment: { type: String, required: true },
    date: { type: Date, required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);