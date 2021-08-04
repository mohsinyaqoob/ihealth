const express = require('express')
const router = express.Router()

const PatientAuthMiddleware = require('../../middleware/patient/Authentication')
const Checkin = require('../../models/Checkin')

router.get('/checkins', PatientAuthMiddleware, async (req, res) => {
  try {
    const checkins = await
      Checkin.find({ patientId: req.PatientId })
        .populate('hospital')
        .populate('checkInType')

    return res.json({ checkins })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error!' }] })
  }
})

module.exports = router