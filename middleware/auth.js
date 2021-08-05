const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = function (req, res, next) {
    const token = req.header('x-auth-token');
    // Make sure role  = admin and token is set

    if (!token) {
        return res.status(401).json({ msg: 'No token. Authorization denied.' })
    }

    try {

        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user;

        next();
    } catch (err) {
        return res.status(401).json({ msg: 'Token is not valid' })
    }


}