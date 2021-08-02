const mongoose = require('mongoose')

const CheckInTypeSchema = mongoose.Schema({
  type: {
    type: String
  }
})

module.exports = CheckInType = mongoose.model('checkin-types', CheckInTypeSchema)