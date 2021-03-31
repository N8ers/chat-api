const router = require('express').Router()
const knex = require('../config/config')

const { buildGenericRoutes } = require('../helpers/genericRouteBuilder')

// generic routes
const genericRoutesToBuild = ['GetAll', 'GetById', 'DeleteById']
const tableToQuery = 'friends'
buildGenericRoutes(genericRoutesToBuild, tableToQuery, router)

// get friends by user id
router.get(`/user_id/:id`, async (req, res) => {
  let friends = await 
    knex.select('friend_id as user_id', 'username')
    .from('friends').where({ user_id: req.params.id })
    .join('users', 'friend_id', '=', 'users.id')
  res.send(friends)
})

module.exports = router;