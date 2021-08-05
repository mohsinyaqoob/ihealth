const mongoose = require('mongoose')

const DrugSchema = mongoose.Schema({
  drug_name: {
    type: String
  }
})

module.exports = Drug = mongoose.model('drugs', DrugSchema)