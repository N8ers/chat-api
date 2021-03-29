//////////////////////////////////////////////////////////////////
// The seeding process in knex causes problems with Postgresses //
// auto incrementing, so this is a custom seeder                //
//////////////////////////////////////////////////////////////////

const knex = require('./config')

async function seed () {
  console.log('seeding')
  await knex.schema.hasTable('conversations').then((exists) => {
    if (exists) knex('conversations').del()
  }),
  await knex.schema.hasTable('messages').then((exists) => {
    if (exists) knex('messages').del()
  }),
  await knex.schema.hasTable('conversation_members').then((exists) => {
    if (exists) knex('conversation_members').del()
  }),
  await knex.schema.hasTable('friends').then((exists) => {
    if (exists) knex('friends').del()
  }),
  await knex.schema.hasTable('users').then((exists) => {
    if (exists) knex('users').del()
  })

  const users = await knex('users').insert([
    { username: 'Goon'   },  // id 1
    { username: 'Tsuki'  },  // id 2
    { username: 'Joe'    },  // id 3
    { username: 'N8'     }   // id 4
  ]).returning('*')
  console.log('users ', users)

  const friends = await knex('friends').insert([
    { userId: users[2].id, friendId: users[3].id }, // Joe   & N8
    { userId: users[3].id, friendId: users[2].id }, // N8    & Joe
    { userId: users[0].id, friendId: users[3].id }, // Goon  & N8
    { userId: users[3].id, friendId: users[0].id }, // N8    & Goon
    { userId: users[1].id, friendId: users[3].id }, // Tsuki & N8
    { userId: users[3].id, friendId: users[1].id }, // N8    & Tsuki
  ]).returning('*')
  console.log('friends: ', friends)

  const conversations = await knex('conversations').insert([
    { name: 'Goon n N8' },
    { name: 'n8 & Tsuki' },
    { name: 'Joe and Nate' },
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
    { userId: users[0].id, conversationId: conversations[0].id, content: 'Hi honey!'    },
    { userId: users[3].id, conversationId: conversations[0].id, content: 'Hello, dear'  },
    { userId: users[1].id, conversationId: conversations[1].id, content: 'Meow!'        },
    { userId: users[3].id, conversationId: conversations[1].id, content: 'Hello, tsuki' },
    { userId: users[2].id, conversationId: conversations[2].id, content: 'Sup bro'      },
    { userId: users[3].id, conversationId: conversations[2].id, content: 'Hi, Joe'      },
  ]).returning('*')
  console.log('messages ', messages)
}

seed()
.then(() => {
  console.log('seeding done')
  knex.destroy()
  process.exit()
})
