const mongoose = require('mongoose')

const LabTestSchema = mongoose.Schema({
  test_name: {
    type: String
  },
  test_type: {
    type: Number,
    // 1: Serum/Blood/Body Fluid
    // 2: Imaging
    enum: [1, 2]
  }
})

module.exports = LabTest = mongoose.model('labtests', LabTestSchema)