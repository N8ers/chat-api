const router = require('express').Router()
const knex = require('../config/config')

const { } = require('../controllers/user.controller')
const { buildGenericRoutes } = require('./genericRouteBuilder');

// generic routes
const genericRoutesToBuild = ['GetAll', 'GetById', 'DeleteById']
const tableToQuery = 'users'
buildGenericRoutes(genericRoutesToBuild, tableToQuery, router)

// create User
router.post('/', async (req, res) => {
  // make this controller at some point
  const { username } = req.body
  const newUser = await knex('users').insert({ username }, ['id']).returning('*')
  res.json(newUser)
})

// edit User username
router.put('/', async (req, res) => {
  const { id, username } = req.body
  const modifiedUser = await knex.select('id').from('users').where({ id }).update({ username }).returning('*')
  res.json(modifiedUser)
})

module.exports = router;