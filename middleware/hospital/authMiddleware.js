const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = authMiddleware = (req, res, next) => {

    const token = req.header('x-auth-token')
    if (token) {
        try {
            const decoded = jwt.verify(token, config.get('jwtSecret'))
            if (!decoded.hospitalId) {
                return res.status(403).json({ errors: [{ msg: 'Auth Error.' }] })
            }
            req.hospitalId = decoded.hospitalId;
            next();
        } catch (err) {
            return res.status(403).json({ errors: [{ msg: 'Auth Error.' }] })
        }
    } else {
        return res.status(403).json({ errors: [{ msg: 'Auth Error. No token.' }] })
    }

}