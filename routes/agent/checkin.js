const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const agentAuthMiddleware = require('../../middleware/agent/agentAuthMiddleware')

const MedicalUnit = require('../../models/MedicalUnit')
const Patient = require('../../models/Patient')
const Checkin = require('../../models/Checkin')
const CheckInType = require('../../models/CheckInTypes')
const User = require('../../models/User')


/**
 * POST
 * Registers a Checkin
 * Private
 */
router.post('/', [
  agentAuthMiddleware,
  body('patientId').not().isEmpty().withMessage('Patient ID cannot be empty'),
  body('medicalUnit').not().isEmpty().withMessage('Medical unit cannot be empty'),
  body('checkInType').not().isEmpty().withMessage('Check-in type cannot be empty')
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() })
  }

  const { patientId, medicalUnit, checkInType } = req.body;

  try {

    const patient = await Patient.findOne({ _id: patientId })

    const medUnit = await MedicalUnit.findOne({
      value: medicalUnit.value,
      label: medicalUnit.label
    })

    const checkInType2 = await CheckInType.findOne({ value: checkInType });

    const agent = await User.findById(req.agentId)

    if (!patient || !medUnit || !checkInType2) {
      return res.status(404).json({ errors: [{ msg: 'Somthing went wrong.' }] })
    }

    const checkin = new Checkin({
      checkInDateTime: Date.now(),
      patientId: patient._id,
      medicalUnit: medUnit._id,
      checkInType: checkInType2._id,
      createdBy: agent._id,
      hospital: agent.hospital,
      treatmentStatus: 1
    })

    await checkin.save();
    res.json({ msg: 'Emergency checkin created. Refer patient to doctor.' })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})


/**
 * GET
 * Get all checkins 
 * Private
 */
router.get('/showAll', agentAuthMiddleware, async (req, res) => {
  const agent = await User.findOne({ _id: req.agentId })
  try {

    const checkins = await Checkin.find({ hospital: agent.hospital })
      .populate('patientId', ['firstname', 'lastname', 'contact'])
      .populate('hospital', ['name'])
      .populate('createdBy', ['name'])
      .populate('medicalUnit', ['label'])
      .populate('checkInType', ['label'])
      .sort({ checkInDateTime: -1 })

    if (!checkins) {
      return res.status(404).json({ errors: [{ msg: 'Cannot fetch checkins. Somthing went wrong.' }] })
    }

    return res.json({ checkins })

  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})

module.exports = router