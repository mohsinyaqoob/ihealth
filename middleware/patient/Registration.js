const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');
    // Make sure role  = admin and token is set

    if (!token) {
        return res.status(401).json({ errors: [{ msg: 'Auth failed. No token.' }] })
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.UidaiId = decoded.UidaiId;
        next();
    } catch (err) {
        console.log(err.message)
        if (err.message === 'jwt expired') {
            return res.status(401).json({ errors: [{ msg: 'Session expired. Please log in.' }] })
        }
        return res.status(401).json({ errors: [{ msg: 'Server error.' }] })
    }
}
