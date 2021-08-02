const mongoose = require('mongoose')

const MedicalUnitSchema = mongoose.Schema({
  label: {
    type: String
  },
  value: {
    type: String
  }
})

module.exports = MedicalUnit = mongoose.model('medical-units', MedicalUnitSchema)