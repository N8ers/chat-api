const router = require('express').Router()
const knex = require('../config/config')

const { buildGenericRoutes } = require('../helpers/genericRouteBuilder')

// generic routes
const genericRoutesToBuild = ['GetAll', 'GetById', 'DeleteById']
const tableToQuery = 'friends'
buildGenericRoutes(genericRoutesToBuild, tableToQuery, router)

// get friends by user id
router.get(`/userId/:id`, async (req, res) => {
  let friends = await 
    knex.select('friendId as userId', 'username')
    .from('friends').where({ userId: req.params.id })
    .join('users', 'friendId', '=', 'users.id')
  res.send(friends)
})

module.exports = router;