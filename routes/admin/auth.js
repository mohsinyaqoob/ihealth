const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config')

const auth = require('../../middleware/auth')
const Admin = require('../../models/Admin');


router.get('/', auth, async (req, res) => {
    // Load user

    try {
        const admin = await Admin.findById(req.user.id).select('-password');
        return res.status(200).json({ admin })
    } catch (err) {
        res.status(401).json({ msg: 'Auth error' })
    }

})

// Login and return token
router.post('/',
    body('username').not().isEmpty(
    ).withMessage('Username is required'),
    body('password').not().isEmpty().withMessage('Password is required'),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(401).json(errors);
        }

        const { username, password } = req.body;

        try {
            // Check if user exists in 
            const admin = await Admin.findOne({ username, password });

            if (!admin) {
                return res.status(401).json({ errors: [{ msg: 'Invalid credentials' }] })
            }

            const payload = {
                user: {
                    id: admin.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 3600 },
                (err, token) => {
                    if (err) throw err;
                    return res.json({ token })
                }
            )

        } catch (err) {
            return res.status(500).json({ errors: [{ msg: "Somthing went wrong" }] });
        }
    })


module.exports = router;