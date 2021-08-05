const mongoose = require('mongoose')

const ComplaintModel = mongoose.Schema({
  complaints: {
    type: Array,
    required: true
  },
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
    default: Date.now()
  }
})

module.exports = Complaint = mongoose.model('complaints', ComplaintModel)

