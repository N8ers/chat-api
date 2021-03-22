const router = require('express').Router()

const { checkConnection } = require('../controllers/status.controller')

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Nathan!' })
})

router.get('/dbConnectionStatus', async (req, res) => {
  const message = await checkConnection()
  res.status(200).json({ message })
})

module.exports = router;