const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const { body, validationResult } = require('express-validator')
const labAuthMiddleware = require('../../middleware/lab/labAuthMiddleware')

const User = require('../../models/User')
const UserRole = require('../../models/UserRole')


/**
 * POST
 * Logs in the lab user
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

    const labRole = await UserRole.findOne({ role_name: 'laboratory' })
    const lab = await User.findOne({ username, password, role: labRole._id })

    if (!lab) {
      return res.status(404).json({ errors: [{ msg: 'Incorrect username or password' }] })
    }

    // Gen Token Payload
    const payload = {
      labId: lab._id
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
 * Return logged in lab
 * Private
 */
router.get('/', labAuthMiddleware, async (req, res) => {
  const { labId } = req;
  try {

    const role = await UserRole.findOne({ role_name: 'laboratory' })

    const lab = await User.findOne({ _id: labId, role: role._id })
      .populate('hospital', 'name')
      .select('-password')

    if (!lab) {
      return res.status(401).json({ errors: [{ msg: 'Could not fetch the lab agent' }] })
    }

    return res.json({ lab })

  } catch (err) {
    console.log(err.message)
    return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
  }
})


module.exports = router;