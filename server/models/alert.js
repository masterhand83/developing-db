const mongoose = require('mongoose');
const { Schema } = mongoose;

const AlertSchema = new Schema({
    projectId: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    projectName: { type: String, required: true }
});

module.exports = mongoose.model('Alert', AlertSchema);