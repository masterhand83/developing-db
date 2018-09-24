const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    mobile: { type: Number, required: true },
    userType: { type: Number, required: true },
    projects: [{ type: Schema.Types.ObjectId, ref: "Project", required:false }]
});

module.exports = mongoose.model('User', UserSchema);