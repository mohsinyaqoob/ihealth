const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const config = require('config')

const UserModel = require('../../models/User')
const UserRoleModel = require('../../models/UserRole')
const agentAuthMiddleware = require('../../middleware/agent/agentAuthMiddleware')


/**
 * POST
 * Login agent
 * Public
 */
router.post('/',
  body('username').not().isEmpty().withMessage('Username is required'),
  body('password').not().isEmpty().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() })
    }
    const { username, password } = req.body;

    try {
      const role = await UserRoleModel.findOne({ role_name: 'agent' })
      const agent = await UserModel.findOne({ username, password, role: role._id, status: 1 });

      if (agent) {
        const payload = {
          agentId: agent._id
        }

        const token = await jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 3600 })
        return res.json({ token })
      }

      return res.status(404).json({ errors: [{ msg: 'Invalid username or password' }] })
    } catch (err) {
      console.log(err.message)
      return res.status(400).json({ errors: [{ msg: 'Somthing went wrong. Server Error.' }] })
    }
  })

/**
 * GET
 * Return User / Load User
 * Private
 */

router.get('/',
  agentAuthMiddleware,
  async (req, res) => {

    const { agentId } = req;
    try {
      const role = await UserRoleModel.findOne({ role_name: 'agent' })
      const agent = await UserModel.findOne({ _id: agentId, role: role._id })
        .populate('hospital', 'name')
        .populate('role')
        .select('-password')

      if (!agent) {
        return res.status(401).json({ errors: [{ msg: 'Could not fetch the agent' }] })
      }

      return res.json({ agent })
    } catch (err) {
      console.log(err.message)
      return res.status(400).json({ errors: [{ msg: 'Server Error.' }] })
    }
  })



module.exports = router