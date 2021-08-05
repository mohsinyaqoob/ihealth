const mongoose = require('mongoose')

const LabTestSchema = mongoose.Schema({
  test_name: {
    type: String
  }
})

module.exports = LabTest = mongoose.model('labtests', LabTestSchema)