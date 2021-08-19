const express = require('express')
const router = express.Router()

const labAuthMiddleware = require('../../middleware/lab/labAuthMiddleware')
const Patient = require('../../models/Patient')
const AssignedTest = require('../../models/AssignedTest')


/**
 * GET
 * Return patient by aadhaar number
 * Private
 */
router.get('/patient', labAuthMiddleware, async (req, res) => {
  const { aadhaarNumber } = req.query;
  if (!aadhaarNumber || aadhaarNumber.length < 12) {
    return res.status(404).json({ errors: [{ msg: 'Enter a valid Aadhaar Number!' }] })
  }
  try {
    const patient = await Patient.findOne({ aadhaarNumber: req.query.aadhaarNumber })
    if (!patient) {
      return res.status(404).json({ errors: [{ msg: 'Patient with that Aadhaar Number does not exist' }] })
    }
    return res.json({ patient })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errors: [{ msg: 'Server Error!' }] })
  }
})

/**
 * GET
 * Return assigned lab tests for a patient
 * Private
 */
router.get('/assignedLabTests', labAuthMiddleware, async (req, res) => {
  const { patient } = req.query
  console.log(patient)
  if (!patient) {
    return res.status(401).json({ errors: [{ msg: 'Please provide a patient id' }] })
  }
  try {

    const assignedTests = await AssignedTest.find({ patient })
      .populate({
        path: 'assignedTest'
      })
      .populate('assignedBy', ['name'])
      .sort({ _id: -1 })

    // Filter out lab tests only
    // Performance issues, however
    let assignedLabTests = []
    for (let i = 0; i < assignedTests.length; i++) {
      if (assignedTests[i].assignedTest.test_type === 1) {
        assignedLabTests.push(assignedTests[i])
      }
    }

    return res.json({ assignedLabTests })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errors: [{ msg: 'Server Error.' }] })
  }
})

/**
 * GET
 * Return assigned imaging tests for a patient
 * Private
 */
router.get('/assignedImagingTests', labAuthMiddleware, async (req, res) => {
  const { patient } = req.query
  console.log(patient)
  if (!patient) {
    return res.status(401).json({ errors: [{ msg: 'Please provide a patient id' }] })
  }
  try {

    const assignedTests = await AssignedTest.find({ patient })
      .populate({
        path: 'assignedTest'
      })
      .sort({ _id: -1 })

    // Filter out imaging tests only
    // Performance issues, however
    let assignedImagingTests = []
    for (let i = 0; i < assignedTests.length; i++) {
      if (assignedTests[i].assignedTest.test_type === 2) {
        assignedImagingTests.push(assignedTests[i])
      }
    }

    return res.json({ assignedImagingTests })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errors: [{ msg: 'Server Error.' }] })
  }
})

/**
 * POST
 * Upload report for a assigned test
 * Private
 */
router.post('/uploadLabReport', labAuthMiddleware, async (req, res) => {
  const { reportFile } = req.files;
  const { testId } = req.query;
  try {

    // Check file size < 1MB
    if (reportFile.size > 1000000) {
      return res.status(400).json({ errors: [{ msg: 'Report size should not exceed 1 MB' }] })
    }

    // Validate AssignedTestId
    const assignedTest = await AssignedTest.findById(testId)
    if (!assignedTest) {
      return res.status(400).json({ errors: [{ msg: 'Invalid Test ID' }] })
    }

    // Check if report already uploaded
    if (assignedTest.report !== "") {
      return res.status(400).json({ errors: [{ msg: 'Report already uploaded' }] })
    }

    // Create unique file name
    const uniqueFileName = `${assignedTest._id}-${reportFile.name}`

    // Save file to server
    const file = await reportFile.mv(`${__dirname}../../../client/public/reports/${uniqueFileName}`)

    // Save file path in collection
    assignedTest.report = `/reports/${uniqueFileName}`;

    // Set status to 2 -- Ready
    assignedTest.testStatus = 2;

    // Apply changes
    await assignedTest.save()

    // Return file path and name
    return res.json({ filePath: '/reports/' + uniqueFileName })

  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errors: [{ msg: 'Server Error.' }] })
  }

})




module.exports = router