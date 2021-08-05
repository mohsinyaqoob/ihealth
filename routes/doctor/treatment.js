const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()

const Vitals = require('../../models/Vitals')
const Checkin = require('../../models/Checkin')
const User = require('../../models/User')
const AssignedTest = require('../../models/AssignedTest')
const Disease = require('../../models/Disease')
const Diagnosis = require('../../models/Diagnosis')
const Complaint = require('../../models/Complaint')
const Medication = require('../../models/Medication')

const doctorAuthMiddleware = require('../../middleware/doctor/doctorAuthMiddleware')

/**
 * POST
 * Creates a vitals for a patient id
 * Private
 */
router.post('/vitals', [
  doctorAuthMiddleware,
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

/**
 * PUT
 * Change status of checkin
 * Private
 */
router.put('/treatmentStatus',
  body('status').not().isEmpty().withMessage('Could not change treatment status'),
  body('checkinId').not().isEmpty().withMessage('Could not set Checkin Id'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() })
    }

    const { checkinId, status } = req.body;

    try {
      const checkin = await Checkin.findOne({ _id: checkinId });
      checkin.treatmentStatus = 2;
      await checkin.save()
      return res.json({ msg: 'Patients treatment started.' })
    } catch (err) {
      return res.status(400).json({ errors: [{ msg: 'Server Error' }] })
    }
  })

/**
 * POST
 * Assign tests to a patient
 * Private
 */
router.post('/assignTests', doctorAuthMiddleware, async (req, res) => {
  try {
    const { assignedTests, checkinId } = req.body
    const assignedTestsCollection = []


    const checkinDetails = await Checkin.findById(checkinId)
    if (!checkinDetails) {
      return res.status(404).json({ errors: [{ msg: 'Invalid Checkin ID' }] })
    }


    for (let i = 0; i < assignedTests.length; i++) {
      assignedTestsCollection.push({
        assignedTest: assignedTests[i].id,
        assignedBy: req.doctorId,
        checkin: checkinId,
        patient: checkinDetails.patientId
      })
    }

    await AssignedTest.insertMany(assignedTestsCollection)
    res.json({ msg: 'success' })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error' }] })
  }
})

/**
 * GET
 * Return all assignedTests for a given patient
 * Private
 */
router.get('/labtests', doctorAuthMiddleware, async (req, res) => {
  try {
    const { checkinId, showTotal } = req.query;

    const checkinDetails = await Checkin.findById(checkinId)
    if (!checkinDetails) {
      return res.status(404).json({ errors: [{ msg: 'Invalid Checkin ID' }] })
    }

    const labtests = await AssignedTest.find({ patient: checkinDetails.patientId })
      .populate('assignedTest')
      .populate({
        path: 'checkin',
        populate: { path: 'patientId', select: ['firstname'] }
      })
      .sort({ _id: -1 })
      .limit(Number(showTotal))

    res.json({ labtests })
  } catch (err) {
    console.log(err.message)
    res.json({ errors: [{ msg: err.message }] })
  }
})

/**
 * POST
 * Posts a disgnosis for a patient
 * Private to Doctor
 */
router.post('/diagnosis', doctorAuthMiddleware, async (req, res) => {
  const { diagnosisId, otherDiagnosis } = req.body.formData;
  const { checkinId } = req.query

  console.log(diagnosisId, otherDiagnosis, checkinId)

  if (!checkinId) {
    return res.status(401).json({ errors: [{ msg: 'Invalid Checkin ID.' }] })
  }

  if (!diagnosisId && !otherDiagnosis) {
    return res.status(401).json({ errors: [{ msg: 'Please mention the diagnosis.' }] })
  }

  try {
    // Ensure disease id is valid
    const disease = await Disease.findById(diagnosisId)
    if (!disease) {
      return res.status(401).json({ errors: [{ msg: 'Invalid diagnosis entered. Try again.' }] })
    }

    // Ensure valid checkinId
    const checkin = await Checkin.findById(checkinId)
    if (!checkin) {
      return res.status(401).json({ errors: [{ msg: 'Invalid checkin ID. Try again.' }] })
    }

    // Save to database
    const diagnosis = new Diagnosis({
      disease: disease._id,
      otherDisease: otherDiagnosis,
      checkin: checkin._id,
      patient: checkin.patientId
    })

    await diagnosis.save()

    return res.json({ msg: 'Diagnosis recorded successfully.' })

  } catch (err) {
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }

})

/**
 * POST
 * Posts complaints for a particulat checkin, patient
 * Private to doctor
 */
router.post('/complaints', doctorAuthMiddleware, async (req, res) => {
  const { complaints, checkinId } = req.body;

  // Ensure valid checkinId
  const checkin = await Checkin.findOne({ _id: checkinId })
  if (!checkin) {
    return res.status(401).json({ errors: [{ msg: 'Invalid checkin.' }] })
  }

  // Ensure complaints feild is empty
  const patientComplaints = checkin.complaints;

  if (patientComplaints.length > 0) {
    return res.status(401).json({ errors: [{ msg: 'Complaints already registered' }] })
  }

  // Add complaints
  checkin.complaints = complaints;
  await checkin.save()

  return res.status(201).json({ msg: 'Complaints recorded.' })

})

/**
 * POST
 * Posts medications for a checkinId for a patient
 * Private
 */
router.post('/assignMedication', doctorAuthMiddleware, async (req, res) => {
  try {
    const { assignedMedications, checkinId } = req.body
    if (assignedMedications.length === 0) {
      return res.status(401).json({ errors: [{ msg: 'Please prescribe some medications' }] })
    }

    // Check all feilds are filled
    for (let i = 0; i < assignedMedications.length; i++) {
      if (!assignedMedications[i].startDate || !assignedMedications[i].endDate || !assignedMedications[i].schedule) {
        return res.status(401).json({ errors: [{ msg: 'Please fill all required feilds of all medications' }] })
      }
    }

    // Get patient ID
    const checkinDetails = await Checkin.findById(checkinId)

    console.log(assignedMedications)
    // Save
    for (let i = 0; i < assignedMedications.length; i++) {
      let med = new Medication({
        drug: assignedMedications[i].drugId,
        schedule: assignedMedications[i].schedule,
        startDate: assignedMedications[i].startDate,
        endDate: assignedMedications[i].endDate,
        checkin: checkinDetails._id,
        patient: checkinDetails.patientId
      })

      await med.save()
    }

    return res.end()

  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})

module.exports = router