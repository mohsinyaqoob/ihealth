const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

const Hospital = require('../../models/Hospital')
const HospitalAuthMiddleware = require('../../middleware/hospital/authMiddleware')
const Patient = require('../../models/Patient')
const UserRole = require('../../models/UserRole')
const User = require('../../models/User')

router.get('/', async (req, res) => {
    try {
        const hospitals = await Hospital.find({}).select(['-password', '-loginId'])
        return res.status(200).json({ hospitals })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ errors: [{ msg: 'Couldnt fetch hospital list.' }] })
    }
})

router.get('/unverifiedBirths', HospitalAuthMiddleware, async (req, res) => {
    if (req.hospitalId) {
        try {
            //console.log(req.hospitalId)
            const unverifiedBirths = await Patient.find({ birthHospital: req.hospitalId }).select(['-password'])
            return res.json({ unverifiedBirths })
        } catch (err) {
            console.log(err.message)
            return res.status(400).json({ errors: [{ msg: 'Cound not fetch unverified births.' }] })
        }
    } else {
        console.log(err.message)
        return res.status(400).json({ errors: [{ msg: 'Cound not fetch unverified births.' }] })
    }
})

router.put('/verifyBirth', [
    HospitalAuthMiddleware,
    body('patientId').not().isEmpty().withMessage('Patient ID to verify cannot be empty')
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(403).json({ errors: errors.array() })
    }

    const { patientId } = req.body;

    try {
        const patient = await Patient.updateOne({ _id: patientId }, { birthHospitalVerified: true })
        // Send an email
        // 
        return res.json({ msg: 'Patient Birth Verified Successfully.' })
    } catch (err) {
        return res.status(400).json({ errors: [{ msg: 'Coudnt not verify the birth' }] })
    }


    console.log(req.body)
    res.json({ msg: 'success' })
})

/**
 * @route GET 
 * @desc Get user roles
 * @access, Private, needs hospitalAuthToken
 */
router.get('/userRoles', HospitalAuthMiddleware, async (req, res) => {
    try {
        const roles = await UserRole.find({});
        return res.json({ roles })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ errors: [{ msg: 'Cound not fetch user roles' }] })
    }
})

router.get('/users', HospitalAuthMiddleware, async (req, res) => {
    try {
        const hospitalId = req.hospitalId;
        const users = await User.find({ hospital: hospitalId })
            .populate('hospital', 'name')
            .populate('role', 'role_name')
        return res.json({ users })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ errors: [{ msg: 'Could not fetch users.' }] })
    }
})

/**
 * PUT
 * Change status of user
 * PRIVATE
 */
router.put('/users', [
    HospitalAuthMiddleware,
    body('user_id').not().isEmpty(),
    body('action').not().isEmpty()
], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }

    const { user_id, action } = req.body;
    console.log(action)

    try {
        await User.updateOne({ _id: user_id }, {
            status: (action === 0 ? 0 : 1)
        })
        return res.json({ msg: 'Status changed' })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ errors: [{ msg: 'Some error' }] })
    }
})

/**
 * GET AGENTS
 * Private
 */
router.get('/agents', HospitalAuthMiddleware, async (req, res) => {
    try {
        const role = await UserRole.findOne({ role_name: 'agent' });
        const agents = await User.find({ role: role._id, hospital: req.hospitalId })
            .populate('hospital', 'name')
            .populate('role', 'role_name')
        res.json({ agents })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ errors: [{ msg: 'Server Error. Could not fetch agents' }] })
    }
})

/**
 * GET DOCTORS
 * Private
 */
router.get('/doctors', HospitalAuthMiddleware, async (req, res) => {
    try {
        const role = await UserRole.findOne({ role_name: 'doctor' });
        const doctors = await User.find({ role: role._id, hospital: req.hospitalId })
            .populate('hospital', 'name')
            .populate('role', 'role_name')
        res.json({ doctors })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ errors: [{ msg: 'Server Error. Could not fetch agents' }] })
    }
})

/**
 * GET Nurses
 * Private
 */
router.get('/nurses', HospitalAuthMiddleware, async (req, res) => {
    try {
        const role = await UserRole.findOne({ role_name: 'nurse' });
        const nurses = await User.find({ role: role._id, hospital: req.hospitalId })
            .populate('hospital', 'name')
            .populate('role', 'role_name')
        res.json({ nurses })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ errors: [{ msg: 'Server Error. Could not fetch agents' }] })
    }
})

/**
 * GET Labs
 * Private
 */
router.get('/labs', HospitalAuthMiddleware, async (req, res) => {
    try {
        const role = await UserRole.findOne({ role_name: 'laboratory' });
        const labs = await User.find({ role: role._id, hospital: req.hospitalId })
            .populate('hospital', 'name')
            .populate('role', 'role_name')
        res.json({ labs })
    } catch (err) {
        console.log(err.message)
        return res.status(400).json({ errors: [{ msg: 'Server Error. Could not fetch agents' }] })
    }
})


module.exports = router;
