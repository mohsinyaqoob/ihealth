const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const config = require('config')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
const UserRole = require('../../models/UserRole')
const doctorAuthMiddleware = require('../../middleware/doctor/doctorAuthMiddleware')

/**
 * POST
 * Doctor Login
 * Public
 */
router.post('/',
  body('username').not().isEmpty().withMessage('Please enter a valid username'),
  body('password').not().isEmpty().withMessage('Please enter a valid password'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() })
    }

    try {
      const { username, password } = req.body

      const doctorRole = await UserRole.findOne({ role_name: 'doctor' })
      const doctor = await User.findOne({ username, password, role: doctorRole._id })

      if (!doctor) {
        return res.status(404).json({ errors: [{ msg: 'Incorrect username or password' }] })
      }

      // Gen Token Payload
      const payload = {
        doctorId: doctor._id
      }
      // Sign Token
      const token = await jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 })

      // Send Token
      return res.json({ token })
    } catch (err) {
      return res.status(400).json({ errors: [{ msg: 'Server Error!' }] })
    }

  })


/**
* GET
* Return Doctor / Load Doctor
* Private
*/

router.get('/',
  doctorAuthMiddleware,
  async (req, res) => {

    const { doctorId } = req;
    try {
      const role = await UserRole.findOne({ role_name: 'doctor' })
      const doctor = await User.findOne({ _id: doctorId, role: role._id })
        .populate('hospital', 'name')
        .select('-password')

      if (!doctor) {
        return res.status(401).json({ errors: [{ msg: 'Could not fetch the doctor' }] })
      }

      return res.json({ doctor })
    } catch (err) {
      console.log(err.message)
      return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
    }
  })

module.exports = router