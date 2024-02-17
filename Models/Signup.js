const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userType: { type: String, required: true, enum: ['doctor', 'patient'] },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    onlineOffline: { type: String, enum: ['online', 'offline'] },
    licenseNumber: { type: String },
    specialization: { type: String, enum: ['surgeon', 'physician', 'cardiologist', 'gynecologist', 'others'] },
    customSpecialization: { type: String },
});

module.exports = mongoose.model('Signup', userSchema);

