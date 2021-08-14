const express = require('express')
const router = express.Router()

const User = require('../../models/User')
const Checkin = require('../../models/Checkin')
const CheckInType = require('../../models/CheckInTypes')
const DoctorAuthMiddleware = require('../../middleware/doctor/doctorAuthMiddleware')
const doctorAuthMiddleware = require('../../middleware/doctor/doctorAuthMiddleware')
const Vitals = require('../../models/Vitals')
const LabTest = require('../../models/LabTest')
const Disease = require('../../models/Disease')
const Diagnosis = require('../../models/Diagnosis')
const { check } = require('express-validator')
const Complaint = require('../../models/Complaint')
const Drug = require('../../models/Drug')
const Medication = require('../../models/Medication')

/**
 * GET
 * Returns checkins (emergency, admission or consultation) for a given hospital
 */
router.get('/checkins', doctorAuthMiddleware, async (req, res) => {
  try {
    const reqCheckInType = await CheckInType.findOne({ value: req.query.checkInType })

    const { doctorId } = req
    const doctor = await User.findById(doctorId)
      .populate('hospital', '_id')

    const hospitalId = doctor.hospital._id;

    const checkIns = await Checkin.find({
      hospital: hospitalId,
      // Return all checkins where treatment is either not started
      // or started but not finalized : $or operator in mongoose
      $or: [{ treatmentStatus: 1 }, { treatmentStatus: 2 }],
      checkInType: reqCheckInType._id
    })
      .populate('patientId', ['firstname', 'lastname', 'aadhaarNumber'])
      .populate('medicalUnit')
      .sort({ checkInDateTime: -1 }
      )

    return res.json({ checkIns })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})

/**
 * GET
 * Returns all vitals ever recorded
 * Private
 */
router.get('/vitals', doctorAuthMiddleware, async (req, res) => {
  const { checkinId, showTotal } = req.query;
  if (!checkinId) {
    return res.status(404).json({ errors: [{ msg: 'Could not fetch vitals' }] })
  }
  try {

    const checkin = await Checkin.findById(checkinId)
    if (!checkin) {
      return res.status(404).json({ errors: [{ msg: 'Invalid Checkin ID' }] })
    }

    const vitals = await Vitals
      .find({ patient: checkin.patientId })
      .limit(Number(showTotal))
      .sort({ _id: -1 })
    return res.json({ vitals })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})

/**
 * GET
 * Returns basic details of patient : CheckinTime, name, aadhaar, age, gender
 */

router.get('/basicPatientDetails', DoctorAuthMiddleware,
  async (req, res) => {
    const checkinId = req.query.checkinId;
    if (!checkinId) {
      return res.status(404).json({ errors: [{ msg: 'Error with Checkin ID' }] })
    }

    // Fetch checkinDetails
    const patientDetails = await Checkin.findOne({ _id: checkinId })
      .populate('patientId', ['firstname', 'lastname', 'aadhaarNumber', 'dob', 'gender'])
      .populate('checkInType')

    if (!patientDetails) {
      return res.status(404).json({ errors: [{ msg: 'Could not fetch patient details' }] })
    }

    res.json({ patientDetails })
  })


/**
 * GET
 * Returns all lab tests available
 * Private
 */
router.get('/labtests', doctorAuthMiddleware, async (req, res) => {
  try {
    const labtests = await LabTest.find({})
    return res.json({ labtests })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})

/**
 * GET
 * Returns all diseases
 * Public
 */

router.get('/diseases', async (req, res) => {
  const searchQuery = req.query.searchQuery;
  try {
    const diseases = await Disease
      .find({
        name: { $regex: searchQuery, $options: 'i' }
      })
      .limit(10)
    return res.json({ diseases })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})

/**
 * GET
 * Returns diseases for a patient
 * Private
 */
router.get('/diagnosedDiseases', doctorAuthMiddleware, async (req, res) => {
  const { checkinId, showTotal } = req.query;
  if (!checkinId) {
    return res.status(404).json({ errors: [{ msg: 'Invalid checkin ID' }] })
  }

  try {
    // Step 1: Load checkin details
    const checkin = await Checkin.findById(checkinId)
    if (!checkin) {
      return res.status(404).json({ errors: [{ msg: 'Invalid Checkin Details. Try again.' }] })
    }
    // Step 2: Load patient using PatientId in checkin collection
    const patient = await Patient.findById(checkin.patientId)
    if (!patient) {
      return res.status(404).json({ errors: [{ msg: 'Invalid Patient Details. Try again.' }] })
    }

    // Step 3: Load diseases using patient id
    const diagnosedDiseases = await Diagnosis
      .find({ patient: patient._id })
      .populate('disease')
      .limit(Number(showTotal))

    return res.json({ diagnosedDiseases })

  } catch (err) {
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }

})


/**
 * GET
 * Returns all checkins for a patient
 * Private
 */

router.get('/patientCheckins', doctorAuthMiddleware, async (req, res) => {
  try {
    const { checkinId } = req.query
    const checkin = await Checkin.findById(checkinId)
    const patientCheckins = await Checkin
      .find({ patientId: checkin.patientId })
      .populate('checkInType')
      .populate('hospital', 'name')
      .sort({ _id: -1 })



    const complaints = await Complaint.find({ checkin: checkin._id });

    return res.json({ patientCheckins, complaints })
  } catch (err) {
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})

/**
 * GET
 * Return complaints for a checkinId and Patient
 * Private to doctor
 */

router.get('/complaints', doctorAuthMiddleware, async (req, res) => {
  const { checkinId } = req.query
  try {
    const checkinDetails = await Checkin.findById(checkinId)
    if (!checkinDetails) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Checkin ID' }] })
    }

    return res.json({ complaints: checkinDetails.complaints })

  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})

/**
 * GET 
 * Returns a list of drug names for a search query
 * Private
 */
router.get('/drugs', doctorAuthMiddleware, async (req, res) => {
  const { searchQuery } = req.query
  if (!searchQuery) {
    return res.json({})
  }
  try {
    const drugs = await Drug
      .find({
        drug_name: { $regex: searchQuery, $options: 'i' }
      })
      .limit(7)

    return res.json({ drugs })

  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }

})

/**
 * GET
 * Returns all related info about a checkin
 * Private to doctor
 */
router.get('/detailedCheckin', doctorAuthMiddleware, async (req, res) => {
  const checkinId = req.query.checkinId
  if (!checkinId) {
    return res.status(404).json({ errors: [{ msg: 'Invalid Checkin ID' }] })
  }

  try {
    const checkinDetails = await Checkin.findById(checkinId)
      .populate('patientId', ['firstname', 'lastname', 'contact'])
      .populate('medicalUnit')
      .populate('checkInType')
      .populate('hospital', 'name')

    if (!checkinDetails) {
      return res.status(404).json({ errors: [{ msg: 'Invalid Checkin ID' }] })
    }

    const vitals = await Vitals.find({ checkin: checkinDetails._id })
    const labTests = await LabTest.find({ checkin: checkinDetails._id })
    const diseases = await Disease.find({ checkin: checkinDetails._id })
    const patientComplaints = await Complaint.findOne({ checkin: checkinDetails._id })
    // Const medications
    res.json({
      detailedCheckin: {
        checkinDetails,
        vitals,
        diseases,
        patientComplaints
        // Medications pending
      }
    })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})


/**
 * GET
 * Returns a list of medicines for a patientId
 * Private
 */
router.get('/medications', doctorAuthMiddleware, async (req, res) => {
  const { checkinId, showTotal } = req.query;
  if (!checkinId) {
    return res.status(404).json({ errors: [{ msg: 'Invalid Checkin Id' }] })
  }

  try {

    const checkinDetails = await Checkin.findById(checkinId)
    if (!checkinDetails) {
      return res.status(401).json({ errors: [{ msg: 'Invalid Checkin Id' }] })
    }

    const medications = await Medication.find({ checkin: checkinDetails._id })
      .populate('drug', 'drug_name')
      .limit(Number(showTotal))
      .sort({ _id: -1 })
    return res.json({ medications })

  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errors: [{ msg: 'Server Error.' }] })
  }



})

module.exports = router