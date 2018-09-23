const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    storeNumber: { type: Number, required: true },
    m2: { type: Number, required: true },
    location: { type: String, required: true },
    localReception: { type: Date, required: true },
    openingDate: { type: Date, required: true },
    furnitureDate: { type: Date, required: true }
});

module.exports = mongoose.model('Project', ProjectSchema)