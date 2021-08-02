const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')

const { GenerateOTP } = require('../../utils/Functions')
const { sendOtp } = require('../../utils/Mailer')
const UidaiModel = require('../../models/Uidai')
const OtpModel = require('../../models/Otp')
const HospitalModel = require('../../models/Hospital')
const PatientModel = require('../../models/Patient')
const RegistrationMiddleware = require('../../middleware/patient/Registration')

/**
 * POST
 * Registers a patient using hospitalId, password and UidaiId in token
 * Private: needs registration token
 */

router.post('/', [
  RegistrationMiddleware,
  body('birthHospital').not().isEmpty().withMessage('Please choose a birth hospital'),
  body('password').isLength({ min: 6, max: 20 }).withMessage('Please enter a password with atleast 6 characters.')
], async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() })
  }

  const { birthHospital, password } = req.body

  // Step 1: Check if hospital is valid
  const validHospital = await HospitalModel.findById(birthHospital)
  if (!validHospital) {
    return res.status(401).json({ errors: [{ msg: 'Please choose a valid hospital.' }] })
  }

  // Step 2: Get UidaiID from Token
  const UidaiId = req.UidaiId

  // Step 3: Fetch UidaiDetails using UidaiId
  const UidaiDetails = await UidaiModel.findById(UidaiId)
  if (!UidaiDetails) {
    return res.status(401).json({ errors: [{ msg: 'Somthing went wrong. Contact Admin.' }] })
  }

  // Step 4: Create patient object using UidaiDetails
  const patient = new PatientModel({
    aadhaarNumber: UidaiDetails.aadhaarNumber,
    firstname: UidaiDetails.firstname,
    middlename: UidaiDetails.middlename,
    lastname: UidaiDetails.lastname,
    dob: UidaiDetails.dob,
    gender: UidaiDetails.gender,
    permanentAddress: UidaiDetails.residence,
    temporaryAddress: UidaiDetails.residence,
    contact: UidaiDetails.registeredPhone,
    email: UidaiDetails.registeredEmail,
    password: password,
    birthHospital: birthHospital,
    birthHospitalVerified: false
  })

  // Step 5: Save Patient
  await patient.save()


  // Step 6: Return token with {patientId}
  const token = await jwt.sign(
    { PatientId: patient._id },
    config.get('jwtSecret'),
    { expiresIn: 3600 }
  )

  res.json({ token })
})


/**
 * POST
 * Validates aadhaar and returns Aadhaar and Masked Phone
 * Public
 */
router.post('/validateAadhaar',
  body('aadhaarNumber').isLength({ min: 12, max: 12 }).withMessage('Enter a valid 12 digit Aadhaar Number'),
  async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() })
    }

    const aadhaarNumber = req.body.aadhaarNumber;

    try {
      // Step 1: Check if Aadhaar Exists in UIDAI Database
      const UidaiDetails = await UidaiModel.findOne({ aadhaarNumber })
      if (!UidaiDetails) {
        return res.status(404).json({ errors: [{ msg: 'Aadhaar Number is invalid' }] })
      }

      // Step 2: Check of Patient with that Aadhaar Already exists
      const patient = await Patient.findOne({ aadhaarNumber })
      if (patient) {
        return res.status(401).json({ errors: [{ msg: 'This Aadhaar Number is already in use' }] })
      }

      // Step 3: Generate 6 digit random OTP
      const generatedOtp = GenerateOTP()

      // Step 4: Save OTP in Database
      const otp = new OtpModel({
        otpValue: generatedOtp,
        aadhaarNumber,
        expiresIn: new Date().setMinutes(new Date().getMinutes() + 5)
      })

      await otp.save()

      // Step 5: Send Email to registered Phone / Email with corresponding OTP
      await sendOtp({
        email: UidaiDetails.registeredEmail,
        subject: "iHealth OTP for Patient Registration",
        otp: generatedOtp
      }) // Uncomment in production

      // Step 6: Mask the phone number
      const phone = UidaiDetails.registeredPhone.substring(UidaiDetails.registeredPhone.length - 4)

      // Step 7: Return masked phone number and UidaiId {phone, uidaiId}
      res.json({ aadhaarNumber: UidaiDetails.aadhaarNumber, phone })

    } catch (err) {
      console.log(err.message)
      return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
    }

  })

/**
* POST
* Validates OTP and returns RegistrationToken for patient registration
* Public
*/
router.post('/validateOtp', async (req, res) => {
  const { aadhaarNumber, otp } = req.body;

  // Step 1: Check if OTP is valid
  const otpFound = await OtpModel.findOne({ aadhaarNumber, otpValue: otp }).sort({ _id: -1 }).limit(1)
  if (!otpFound) {
    return res.status(401).json({ errors: [{ msg: 'OTP is not valid' }] })
  }
  // Step 2: Remove OTP from Database
  await otpFound.remove()

  // Step 3: Fetch UidaiId using Aadhaar Number
  const UidaiDetails = await UidaiModel.findOne({ aadhaarNumber })

  // Step 4: Create a payload and token
  const token = await jwt.sign({ UidaiId: UidaiDetails._id }, config.get('jwtSecret'), { expiresIn: 3600 })

  // Step 5: Return a RegistrationToken containing _id frmo Uidai
  res.json({ registrationToken: token })

})

/**
 * GET
 * Returns list of all hospitals under iHealth database
 * Public
 */

router.get('/hospitals', async (req, res) => {
  try {
    const hospitals = await HospitalModel.find({})
      .select(['-password', '-loginId'])

    let formattedHospitals = [];

    hospitals.map(hospital => (
      formattedHospitals.push({ label: hospital.name, value: hospital._id })
    ))

    return res.json({ formattedHospitals })

  } catch (err) {
    console.log(err.message)
  }
})

module.exports = router