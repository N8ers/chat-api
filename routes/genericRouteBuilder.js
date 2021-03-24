const knex = require('../config/config')

async function buildGenericRoutes (routesToBuild, tableToQuery, router) {
  if (routesToBuild.includes('GetAll')) {
    router.get(`/`, async (req, res) => {
      let result = await knex.select().from(tableToQuery);
      res.send(result)
    })
  }

  if (routesToBuild.includes('GetById')) {
    router.get(`/:id`, async (req, res) => {
      let result = await knex.select().from(tableToQuery).where({ id: req.params.id })
      res.send(result)
    })
  }

  if (routesToBuild.includes('DeleteById')) {
    router.delete(`/:id`, async (req, res) => {
      await knex(tableToQuery).where({ id: req.params.id }).del()
      res.send('delete successful')
    })
  }

  return router;
}

module.exports = {
  buildGenericRoutes
}