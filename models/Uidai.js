const mongoose = require('mongoose');

const UidaiSchema = mongoose.Schema({
    aadhaarNumber: {
        type: String
    },
    firstname: {
        type: String
    },
    middlename: {
        type: String
    },
    lastname: {
        type: String
    },
    dob: {
        type: String
    },
    gender: {
        type: String
    },
    parentage: {
        type: String
    },
    residence: {
        type: String
    },
    registeredPhone: {
        type: String
    },
    registeredEmail: {
        type: String
    }
})

module.exports = Uidai = mongoose.model('uidais', UidaiSchema);
