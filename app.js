const app = require('./routes/index')
const { sequelize } = require('./models/index')

const PORT = 3000

sequelize
  .authenticate()
  .then(() => {
    app.listen(PORT, () => console.log(`chat-api running on port ${PORT}`));
  })
  .catch((err) => console.log('ERRO ', err))
