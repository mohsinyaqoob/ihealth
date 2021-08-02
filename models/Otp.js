const mongoose = require('mongoose')

const OtpSchema = mongoose.Schema({
    otpValue: {
        type: String,
        required: true
    },
    aadhaarNumber: {
        type: String,
        required: true
    },
    expiresIn: {
        type: Date,
        default: new Date(new Date().getTime() + 1 * 60000)
    }
})

module.exports = Otp = mongoose.model('otps', OtpSchema)