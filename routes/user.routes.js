const router = require('express').Router()

const { getAllUsers, getUserById, createUser } = require('../controllers/user.controller')

// get Users
router.get('/users', async (req, res) => {
  let users = await getAllUsers()
  res.send(users)
})

// get User by id
router.get('/user', async (req, res) => {
  let user = await getUserById(req)
  res.send(user)
})

// create User
router.post('/user', async (req, res) => {
  let result = await createUser(req)
  res.send({ users: result })
})

// edit User username
router.put('/user', (req, res) => { })

// delete User by id
router.delete('/user', (req, res) => { })

module.exports = router;