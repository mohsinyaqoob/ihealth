const mongoose = require('mongoose');

const HospitalSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    loginId: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    type: {
        type: String,
        enum: ['Government', 'Private'],
        required: true,
    },
    location: {
        type: String,
        required: true
    }
});

module.exports = Hospital = mongoose.model('hospitals', HospitalSchema);
