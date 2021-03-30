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
    { user_id: users[2].id, friend_id: users[3].id }, // Joe   & N8
    { user_id: users[3].id, friend_id: users[2].id }, // N8    & Joe
    { user_id: users[0].id, friend_id: users[3].id }, // Goon  & N8
    { user_id: users[3].id, friend_id: users[0].id }, // N8    & Goon
    { user_id: users[1].id, friend_id: users[3].id }, // Tsuki & N8
    { user_id: users[3].id, friend_id: users[1].id }, // N8    & Tsuki
  ]).returning('*')
  console.log('friends: ', friends)

  const conversations = await knex('conversations').insert([
    { name: 'Goon n N8' },
    { name: 'n8 & Tsuki' },
    { name: 'Joe and Nate' },
  ]).returning('*')
  console.log('conversations ', conversations)

  const conversation_members = await knex('conversation_members').insert([
    { user_id: users[3].id, conversation_id: conversations[0].id },
    { user_id: users[0].id, conversation_id: conversations[0].id },
    { user_id: users[3].id, conversation_id: conversations[1].id },
    { user_id: users[1].id, conversation_id: conversations[1].id },
    { user_id: users[3].id, conversation_id: conversations[2].id },
    { user_id: users[2].id, conversation_id: conversations[2].id }
  ]).returning('*')
  console.log('conversaion_members ', conversation_members)

  const messages = await knex('messages').insert([
    { user_id: users[0].id, conversation_id: conversations[0].id, content: 'Hi honey!'    },
    { user_id: users[3].id, conversation_id: conversations[0].id, content: 'Hello, dear'  },
    { user_id: users[1].id, conversation_id: conversations[1].id, content: 'Meow!'        },
    { user_id: users[3].id, conversation_id: conversations[1].id, content: 'Hello, tsuki' },
    { user_id: users[2].id, conversation_id: conversations[2].id, content: 'Sup bro'      },
    { user_id: users[3].id, conversation_id: conversations[2].id, content: 'Hi, Joe'      },
  ]).returning('*')
  console.log('messages ', messages)
}

seed()
.then(() => {
  console.log('seeding done')
  knex.destroy()
  process.exit()
})
