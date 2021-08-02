const mongoose = require('mongoose')

const SymptomSchema = mongoose.Schema({
  label: {
    type: String
  },
  value: {
    type: String
  }
})

module.exports = Symptom = mongoose.model('symptoms', SymptomSchema)