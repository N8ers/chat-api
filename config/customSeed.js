//////////////////////////////////////////////////////////////////
// The seeding process in knex causes problems with Postgresses //
// auto incrementing, so this is a custom seeder                //
//////////////////////////////////////////////////////////////////

const knex = require('./config')

async function seed () {
  console.log('seeding')
  await knex('conversations').del(),
  await knex('messages').del(),
  await knex('conversation_members').del(),
  await knex('users').del()

  const users = await knex('users').insert([
    { username: 'Goon'  },
    { username: 'Tsuki' },
    { username: 'Joe'   },
    { username: 'N8'    }
  ]).returning('*')
  console.log('users ', users)

  const conversations = await knex('conversations').insert([
    { name: 'n8 and Tsuki' },
    { name: 'Goon and n8' },
    { name: 'Joe and n8' },
  ]).returning('*')
  console.log('conversations ', conversations)

  const conversation_members = await knex('conversation_members').insert([
    { userId: users[3].id, conversationId: conversations[0].id },
    { userId: users[0].id, conversationId: conversations[0].id },
    { userId: users[3].id, conversationId: conversations[1].id },
    { userId: users[1].id, conversationId: conversations[1].id },
    { userId: users[3].id, conversationId: conversations[2].id },
    { userId: users[2].id, conversationId: conversations[2].id }
  ]).returning('*')
  console.log('conversaion_members ', conversation_members)

  const messages = await knex('messages').insert([
    { userId: users[0].id, conversationId: conversations[0].id, content: 'Meow!'       },
    { userId: users[3].id, conversationId: conversations[0].id, content: 'Hi, Tsuki'   },
    { userId: users[1].id, conversationId: conversations[1].id, content: 'Hi, Honey'   },
    { userId: users[3].id, conversationId: conversations[1].id, content: 'Hello, bean' },
    { userId: users[2].id, conversationId: conversations[2].id, content: 'Sup bro'     },
    { userId: users[3].id, conversationId: conversations[2].id, content: 'Hi, Joe'     },
  ]).returning('*')
  console.log('messages ', messages)
}

seed()
.then(() => {
  console.log('seeding done')
  knex.destroy()
  process.exit()
})
