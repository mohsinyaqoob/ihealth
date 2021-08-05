const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
    aadhaarNumber: {
        type: String,
        required: true,
        unique: true
    },
    firstname: {
        type: String,
        required: true
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    gender: {
        type: String
    },
    permanentAddress: {
        type: String,
        required: true
    },
    temporaryAddress: {
        type: String
    },
    contact: {
        type: String,
        require: true,
        length: 10
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    birthHospital: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospitals'
    },
    birthHospitalVerified: {
        type: Boolean,
        default: 'false'
    }
});

module.exports = Patient = mongoose.model('patients', PatientSchema);
