const mongoose = require('mongoose')

const CheckInSchema = mongoose.Schema({
  checkInDateTime: {
    type: Date,
    default: Date.now(),
    required: true
  },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patients',
    required: true
  },
  medicalUnit: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'medical-units'
  },
  checkInType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'checkin-types'
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hospitals'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: true
  },
  treatmentStatus: {
    type: Number,
    // 1: Not treated
    // 2: Treatment Started
    // 3: Treatment Finished
    enum: [1, 2, 3],
    default: 1
  },
  complaints: {
    type: Array
  }
})

module.exports = Checkin = mongoose.model('checkins', CheckInSchema)