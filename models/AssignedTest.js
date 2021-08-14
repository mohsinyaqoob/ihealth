const mongoose = require('mongoose')

const AssignedTestSchema = mongoose.Schema({
  assignedTest: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'labtests'
  },
  assignedDate: {
    type: Date,
    default: Date.now()
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  checkin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'checkins'
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patients'
  },
  /** 1: Not Initiated
   * 2: Under Process /  Not Ready
   * 3: Ready
   */
  testStatus: {
    type: Number,
    enum: [1, 2, 3],
    default: 1
  },
  report: {
    type: String,
    default: ''
  }
})


module.exports = AssignedTest = mongoose.model('assigned-tests', AssignedTestSchema)