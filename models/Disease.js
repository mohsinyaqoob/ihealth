const mongoose = require('mongoose');


const DiseaseSchema = mongoose.Schema({
  name: {
    type: String
  },
  abbr: {
    type: String
  }
})


module.exports = Disease = mongoose.model('diseases', DiseaseSchema)