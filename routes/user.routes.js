const router = require('express').Router()
const knex = require('../config/config')

// const { createUser, editUser } = require('../controllers/user.controller')
const { buildGenericRoutes } = require('./genericRouteBuilder');

const genericRoutesToBuild = ['GetAll', 'GetById', 'DeleteById']
const tableToQuery = 'users'

buildGenericRoutes(genericRoutesToBuild, tableToQuery, router)

// create User
router.post('/', async (req, res) => {
  // make this controller at some point
  const { username } = req.body
  const newUser = await knex('users').insert({ username }, ['id']).returning('*');
  res.json(newUser)
})

// edit User username
// router.put('/user', async (req, res) => {/
// })

module.exports = router;