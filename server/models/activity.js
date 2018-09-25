const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActivitySchema = new Schema({
    initialDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    progress: { type: Number, required: true },
    objective: { type: String, required: false },
    deliverable: { type: String, required: true }
});

module.exports = mongoose.model('Activity', ActivitySchema);