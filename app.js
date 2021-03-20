const app = require('./routes/index')
// const { sequelize } = require('./models/index')

const PORT = 3000

// const knex = require('knex')({
//   client: 'postgres',
//   connection: {
//     host : 'localhost',
//     user : 'postgres',
//     password : '2345',
//     database : 'chatapi'
//   }
// });


app.listen(PORT, () => console.log(`chat-api running on port ${PORT}`));



// sequelize
//   .authenticate()
//   .then(() => {
//     app.listen(PORT, () => console.log(`chat-api running on port ${PORT}`));
//   })
//   .catch((err) => console.log('ERRO ', err))
