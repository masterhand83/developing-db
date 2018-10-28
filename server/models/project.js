const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, default: '', required: false },
    storeName: {type: String, default: '', required: false },
    storeNumber: { type: Number, default: 0 , required: false },
    m2: { type: Number, default: 0, required: false },
    location: { type: String, default: '', required: false },
    localReception: { type: Date, default: null, required: false },
    openingDate: { type: Date, default: null, required: false },
    furnitureDate: { type: Date, default: null, required: false },
    alertsActivated: {type: Boolean, default: true, required: true},
    activities: [{ type: Schema.Types.ObjectId, ref: "Activity", default: [], required: true }],
    resident: { type: String, required: false }
});

module.exports = mongoose.model('Project', ProjectSchema);