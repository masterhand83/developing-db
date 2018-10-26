const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActivitySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    priority: { type: Number, required: true },
    objective: { type: String, required: false },
    deliverable: { type: String, required: false },
    finished: { type: Boolean, default: false, required: true }
});

module.exports = mongoose.model('Activity', ActivitySchema);