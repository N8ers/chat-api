const router = require('express').Router()

// const { checkConnection } = require('../controllers/status.controller')

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello Nathan!' })
})

// router.get('/dbConnectionStatus', async (req, res) => {
//   let status = await checkConnection()
//   if (status) {
//     res.status(200).send('connection good')
//   } else {
//     res.status(500).send('connection bad')
//   }
// })

module.exports = router;