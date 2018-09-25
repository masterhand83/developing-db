const mongoose = require('mongoose');
const { Schema } = mongoose;

const ActivitySchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    objective: { type: String, required: false },
    deliverable: { type: String, required: false }
});

module.exports = mongoose.model('Activity', ActivitySchema);