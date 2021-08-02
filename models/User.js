const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  status: {
    type: Number,
    default: 1
  },
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user-roles'
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'hospitals'
  }
})


module.exports = User = mongoose.model("users", UserSchema)