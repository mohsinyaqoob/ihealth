const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = nurseAuthMiddleware = (req, res, next) => {

  const token = req.header('x-auth-token')
  if (token) {
    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'))
      if (!decoded.nurseId) {
        return res.status(403).json({ errors: [{ msg: 'Auth Error. Please login.' }] })
      }
      req.nurseId = decoded.nurseId;
      next();
    } catch (err) {
      return res
        .status(403)
        .json({ errors: [{ msg: 'Auth Error. Please login in.' }] })
    }
  } else {
    return res.status(403).json({ errors: [{ msg: 'Auth Error. No token.' }] })
  }

}