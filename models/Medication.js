const mongoose = require('mongoose')

const MedicationSchema = mongoose.Schema({
  drug: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'drugs',
    required: true
  },
  schedule: {
    type: String,
    enum: ['bd', 'od', 'tid', 'bbf', 'bt', 'sos'],
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now()
  },
  endDate: {
    type: Date,
    default: () => new Date(+new Date() + 7 * 24 * 60 * 60 * 1000),
    required: true
  },
  checkin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'checkins'
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patients'
  }
})

module.exports = Medication = mongoose.model('medications', MedicationSchema)