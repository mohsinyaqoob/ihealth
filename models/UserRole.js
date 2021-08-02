const mongoose = require('mongoose')

const UserRoleSchema = mongoose.Schema({
  roleName: {
    type: String,
    unique: true
  }
})

module.exports = UserRole = mongoose.model('user-roles', UserRoleSchema);