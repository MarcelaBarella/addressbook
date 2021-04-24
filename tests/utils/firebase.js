// TODO: implement helpers for firebase;
const database = require('../../config/firebase');
const dbHelperUser = require('./sequelize')
const env =  process.env.NODE_ENV

if (env !== 'test') {
  throw Error(
    'These are integration tests. Make sure you are running under `test` environment.'
  )
}

const restartContactsTable = async () => {
  await database.ref(`users/${user.id}/contacts`).delete()
}

const createContact = async (contact) => {
  await database.ref(`users/${user.id}/contacts`).push(contact)
}

module.exports = {
  restartContactsTable,
  createContact
}
