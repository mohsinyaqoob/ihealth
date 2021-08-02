const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const Hospital = require('../../models/Hospital')
const hospitalAuthMiddleware = require('../../middleware/hospital/authMiddleware')


/**
 * @route POST 
 * @desc Logs the hospital in
 * @access public 
 */
router.post('/login',
    body('hospitalId').isLength({ min: 6 }).withMessage('Invalid Hospital'),
    async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const { hospitalId, password } = req.body;
        console.log(hospitalId, password)
        try {
            const hos = await Hospital.findOne({ _id: hospitalId, password: password })
            if (!hos) {
                return res.status(403).json({ errors: [{ msg: 'Invalid Credentials.' }] })
            }

            // generate token
            const payload = {
                hospitalId: hos._id
            }
            const token = await jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 })
            // send token
            return res.status(200).json({ token })
        } catch (err) {
            console.log(err.message)
            return res.status(400).json('Somthing went wrong. Please try again.')
        }
    })

/**
 * @route GET 
 * @desc Load Hospital Details by ID
 * @access, Private
 */

router.get('/loadHospital', hospitalAuthMiddleware, async (req, res) => {
    const hospitalId = req.hospitalId;
    try {
        const hospital = await Hospital.findOne({ _id: hospitalId }).select(['-password', '-loginId'])
        return res.status(200).json({ hospital })
    } catch (err) {
        console.log(err.message)
        return res.status(404).json({ errors: [{ msg: 'Error while fetching hospital details' }] })
    }
})


module.exports = router;