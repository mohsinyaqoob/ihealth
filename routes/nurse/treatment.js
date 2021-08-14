const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

const nurseAuthMiddleware = require('../../middleware/nurse/nurseAuthMiddleware')
const CheckInType = require('../../models/CheckInTypes')
const Checkin = require('../../models/Checkin')
const Vitals = require('../../models/Vitals')

/**
 * POST
 * Creates a vitals for a patient id
 * Private
 */
router.post('/vitals', [
  nurseAuthMiddleware,
  body('spo2').isNumeric().withMessage('Invalid value for SPO2'),
  body('systole').isNumeric().withMessage('Invalid value for Systole'),
  body('diastole').isNumeric().withMessage('Invalid value for Diastole'),
  body('bloodsugar').isNumeric().withMessage('Invalid value for Blood Sugar'),
  body('pulse').isNumeric().withMessage('Invalid value for Pulse'),
  body('bodytemp').isNumeric().withMessage('Invalid value for Body Temperature'),
  body('checkin').not().isEmpty().withMessage('Somthing wrong with check-in details'),
], async (req, res) => {

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() })
  }

  const { checkin, spo2, systole, diastole, bloodsugar, pulse, bodytemp } = req.body;
  const checkinDetails = await Checkin.findById(checkin)
  if (!checkinDetails) {
    return res.status(404).json({ errors: [{ msg: 'Invalid Checkin ID' }] })
  }

  try {
    const vitals = new Vitals({
      checkin,
      patient: checkinDetails.patientId,
      spo2,
      systole,
      diastole,
      bloodsugar,
      pulse,
      bodytemp
    })

    await vitals.save()
    res.json({ msg: 'Vitals recorded.' })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})


module.exports = router;