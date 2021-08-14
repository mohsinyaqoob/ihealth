const express = require('express')
const router = express.Router()

const nurseAuthMiddleware = require('../../middleware/nurse/nurseAuthMiddleware')
const CheckInType = require('../../models/CheckInTypes')
const Checkin = require('../../models/Checkin')

/**
 * GET
 * Returns checkins for a given hospital
 */
router.get('/checkins', nurseAuthMiddleware, async (req, res) => {
  try {
    const reqCheckInType = await CheckInType.findOne({ value: req.query.checkInType })

    const { nurseId } = req
    const nurse = await User.findById(nurseId)
      .populate('hospital', '_id')

    const hospitalId = nurse.hospital._id;

    const checkins = await Checkin.find({
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

    return res.json({ checkins })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})


/**
 * GET
 * Returns basic checkin details of patient
 * Private
 */
router.get('/basicPatientDetails', nurseAuthMiddleware,
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
* Returns all checkins for a patient
* Private
*/
router.get('/patientCheckins', nurseAuthMiddleware, async (req, res) => {
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
 * Returns all vitals ever recorded
 * Private
 */
router.get('/vitals', nurseAuthMiddleware, async (req, res) => {
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


module.exports = router;