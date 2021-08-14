const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const User = require('../../models/User')
const UserRole = require('../../models/UserRole')
const nurseAuthMiddleware = require('../../middleware/nurse/nurseAuthMiddleware')

/**
 * Post
 * Logs in the nurse
 * Public
 */
router.post('/', [
  body('username').not().isEmpty().withMessage('Enter a valid username'),
  body('username').not().isEmpty().withMessage('Enter a valid password')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(401).json({ errors: errors.array() })
  }

  try {
    const { username, password } = req.body

    const nurseRole = await UserRole.findOne({ role_name: 'nurse' })
    const nurse = await User.findOne({ username, password, role: nurseRole._id })

    if (!nurse) {
      return res.status(404).json({ errors: [{ msg: 'Incorrect username or password' }] })
    }

    // Gen Token Payload
    const payload = {
      nurseId: nurse._id
    }
    // Sign Token
    const token = await jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 })

    // Send Token
    return res.json({ token })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({ errors: [{ msg: 'Server Error!' }] })
  }

})

/**
 * GET
 * Return logged in Nurse
 * Private
 */
router.get('/', nurseAuthMiddleware, async (req, res) => {
  const { nurseId } = req;
  try {
    const nurseRole = await UserRole.findOne({ role_name: 'nurse' })
    const nurse = await User.findOne({ _id: nurseId, role: nurseRole._id })
      .populate('hospital', 'name')
      .select('-password')

    if (!nurse) {
      return res.status(401).json({ errors: [{ msg: 'Somthing went wrong with nurse login.' }] })
    }

    return res.json({ nurse })
  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})

module.exports = router;