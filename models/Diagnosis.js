const mongoose = require('mongoose')


const DiagnosisSchema = mongoose.Schema({
  disease: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'diseases'
  },
  otherDisease: {
    type: String,
    default: ""
  },
  diagnosisDate: {
    type: Date,
    default: Date.now()
  },
  checkin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'checkins'
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patients'
  },

  /**
   * 1: Disease Active
   * 2: Disease Inactive
   */

  diseaseStatus: {
    type: Number,
    enum: [1, 2],
    default: 1
  }
})

module.exports = Diagnosis = mongoose.model('diagnosis', DiagnosisSchema)