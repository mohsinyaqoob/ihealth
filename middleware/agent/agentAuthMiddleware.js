const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = agentAuthMiddleware = (req, res, next) => {

  const token = req.header('x-auth-token')
  if (token) {
    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'))
      if (!decoded.agentId) {
        return res.status(403).json({ errors: [{ msg: 'Auth Error. Please login.' }] })
      }
      req.agentId = decoded.agentId;
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