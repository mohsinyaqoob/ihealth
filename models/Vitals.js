const mongoose = require('mongoose')

const VitalsSchema = mongoose.Schema({
  checkin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'checkins'
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patients'
  },
  recordedAt: {
    type: Date,
    default: Date.now(),
    required: true
  },
  spo2: {
    type: String
  },
  systole: {
    type: String
  },
  diastole: {
    type: String
  },
  bloodsugar: {
    type: String
  },
  pulse: {
    type: String
  },
  bodytemp: {
    type: String
  }
})

module.exports = Vitals = mongoose.model('vitals', VitalsSchema)