const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    storeNumber: { type: Number, required: false },
    m2: { type: Number, required: false },
    location: { type: String, required: false },
    localReception: { type: Date, required: false },
    openingDate: { type: Date, required: false },
    furnitureDate: { type: Date, required: false },
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity", required: false, default: [] }]
});

module.exports = mongoose.model('Project', ProjectSchema);