// TODO: implement helpers for firebase;
const database = require('../../config/firebase');
const dbHelperUser = require('./sequelize')
const env =  process.env.NODE_ENV

if (env !== 'test') {
  throw Error(
    'These are integration tests. Make sure you are running under `test` environment.'
  )
}

const createContact = async (user, contact) => {
  await database.ref(`users`).push(contact)
}

module.exports = {
  restartContactsTable,
  createContact
}
