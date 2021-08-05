const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const agentAuthMiddleware = require('../../middleware/agent/agentAuthMiddleware')
const Patient = require('../../models/Patient')
const Symptom = require('../../models/Symptom')
const MedicalUnit = require('../../models/MedicalUnit')

/**
 * POST
 * Returns Patient Details based on Aadhaar
 * Private
 */
router.post('/getPatientDetails', [
  agentAuthMiddleware,
  body('aadhaarNumber').isLength({ min: 12, max: 12 }).withMessage('Enter a valid Aadhaar Number')
], async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: errors.array() })
  }

  try {
    const { aadhaarNumber } = req.body;
    const patient = await Patient.findOne({ aadhaarNumber: aadhaarNumber })
      .populate('birthHospital', 'name')
      .select('-password')
    if (!patient) {
      return res.status(401).json({ errors: [{ msg: 'Patient Not Registered with iHealth' }] })
    }

    if (!patient.birthHospitalVerified) {
      return res.status(401).json({ errors: [{ msg: 'Patient\'s Birth not verified yet' }] })
    }

    res.json({ patient })

  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error. Somthing went wrong.' }] })
  }
})

/**
 * GET
 * Returns list of all symptoms
 * Private
 */
router.get('/symptoms', agentAuthMiddleware, async (req, res) => {
  try {
    const symptoms = await Symptom.find({});
    if (!symptoms) {
      return res.status(404).json({ errors: [{ msg: 'Could not fetch symptoms' }] })
    }

    return res.json({ symptoms })

  } catch (err) {
    return res.status(400).json({ errors: [{ msg: 'Server Error. Could not fetch symptoms' }] })
  }
})

/**
 * GET
 * Gets medical units
 * Private
 */
router.get('/medicalUnits', agentAuthMiddleware, async (req, res) => {
  try {
    const medicalUnits = await MedicalUnit.find({});
    if (!medicalUnits) {
      return res.status(404).json({ errors: [{ msg: 'Could not fetch medical units' }] })
    }
    return res.json({ medicalUnits })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error. Cannot fetch medical units' }] })
  }
})

module.exports = router;