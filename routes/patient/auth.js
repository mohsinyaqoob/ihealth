const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const router = express.Router()
const config = require('config')

const PatientAuthMiddleware = require('../../middleware/patient/Authentication');
const Patient = require('../../models/Patient');


/**
 * GET
 * Returns a patient object
 * Private: Needs auth middleware that contains PatientId
 */
router.get('/',
  PatientAuthMiddleware,
  async (req, res) => {

    const PatientId = req.PatientId;

    try {
      const patient = await Patient.findById(PatientId)
        .populate('birthHospital', 'name')
        .select('-password')

      if (!patient) {
        return res.status(404).json({ errors: [{ msg: 'Invalid Patient' }] })
      }

      res.json({ patient })

    } catch (err) {
      console.log(err.message)
      return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
    }


  })


/**
 * POST
 * Logs in the patient
 * Public
 */

router.post('/',
  body('aadhaarNumber').isLength({ min: 12, max: 12 }).withMessage('Enter a valid 12 digit Aadhaar Number'),
  body('password').not().isEmpty().withMessage('Enter a valid password')
  , async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() })
    }

    const { aadhaarNumber, password } = req.body;

    const patient = await Patient.findOne({ aadhaarNumber, password })
    if (!patient) {
      return res.status(404).json({ errors: [{ msg: 'Incorrect Aadhaar Number or Password' }] })
    }

    const token = await jwt.sign({ PatientId: patient._id }, config.get('jwtSecret'), { expiresIn: 3600 })

    return res.json({ token })
  })


module.exports = router
