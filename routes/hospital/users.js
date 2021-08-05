const express = require('express')
const router = express.Router();
const hospitalAuthMiddleware = require('../../middleware/hospital/authMiddleware')
const { body, validationResult } = require('express-validator')
const User = require('../../models/User')

/**
 * @route POST 
 * @desc Creates an agent account
 * @access, Private
 */
router.post('/createUser',
  [
    hospitalAuthMiddleware,
    body('role').not().isEmpty().withMessage('Role is requied'),
    body('name').not().isEmpty().withMessage('Please enter the name of the agent'),
    body('username').isLength({ min: 6, max: 16 }).withMessage('Username must be min 6 characters and max 16 characters long'),
    body('password').isLength({ min: 6, max: 16 }).withMessage('Password must be min 6 characters and max 16 characters long')
  ]
  , async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const hospitalId = req.hospitalId;
    const { role, name, username, password } = req.body;

    // Call insert function based in what

    try {
      const newUser = new User({
        role,
        name,
        username,
        password,
        hospital: hospitalId
      })
      await newUser.save();
      res.json({ msg: 'User Created' })
    } catch (err) {

      console.log(err.message)
      if (err.code === 11000) {
        return res.status(400).json({ errors: [{ msg: 'Username already exists.' }] })
      }

      return res.status(400).json({ msg: 'Server Error.' })
    }
  })

module.exports = router;