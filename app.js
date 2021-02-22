const express = require('express')
// const sequelize = require('./database/dbConfig')
const { sequelize } = require('./models/index')

const app = express()
const PORT = 3000

app.get('/', (req, res) => res.send('Hello Nathan!'))

app.get('/dbConnectionStatus', async (req, res) => {
  try {
    await sequelize.authenticate()
    res.status(200).send('connection good')
  } catch (error) {
    res.status(500).send(`connection bad \n${error}`)
  }
})

sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => console.log(`chat-api running on port ${PORT}`));
  })
  .catch((err) => console.log('ERRO ', err))
