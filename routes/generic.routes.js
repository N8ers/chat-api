const router = require('express').Router()
const knex = require('../config/config')

// NATHAN: idealy, we will get rid of the `/generic` and just use route
// ex) `/user`
// however, we need to find out if we can build the generic, then 
// add custom routes without overiding the generic

// the route represents the table_name
const genericRoutesToBuild = [
  'users',
  'messages',
  'conversations',
  'conversation_members'
]

for (const genericRoute of genericRoutesToBuild) {
  // GET ALL
  router.get(`/${genericRoute}`, async (req, res) => {
    let result = await knex.select().from(`${genericRoute}`);
    res.send(result)
  })

  // GET BY ID
  router.get(`/${genericRoute}/:id`, async (req, res) => {
    let result = await knex.select().from(`${genericRoute}`).where({ id: req.params.id })
    res.send(result)
  })

  // CREATE

  // DELETE BY ID
  router.delete(`/${genericRoute}/:id`, async (req, res) => {
    await knex(`${genericRoute}`).where({ id: req.params.id }).del()
    res.send('delete successful')
  })
}

module.exports = router;