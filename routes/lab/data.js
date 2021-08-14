const express = require('express')
const router = express.Router()

const labAuthMiddleware = require('../../middleware/lab/labAuthMiddleware')

router.get('/assignedTests', labAuthMiddleware, async (req, res) => {
  const { aadhaarNumber } = req.query
})


module.exports = router