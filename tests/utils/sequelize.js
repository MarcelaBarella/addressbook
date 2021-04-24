const { encrypt } = require('../../utils/password')
const db = require('../../models')
const env = process.env.NODE_ENV

if (env !== 'test') {
  throw Error(
    'These are integration tests. Make sure you are running under `test` environment.'
  )
}

const queryInterface = db.sequelize.getQueryInterface()

const restartUsersTable = async () => {
  await queryInterface.dropTable({ tableName: 'user' })
  await db.sequelize.sync()
}

const closeConnection = async () => {
  await queryInterface.dropTable({ tableName: 'user' })
  await db.sequelize.close()
}

const createUser = async (user) => {
  const hash = await encrypt(user.password)
  await db.user.create({ ...user, password: hash })
}

const resetUsers = async () => {
  await db.user.destroy({ truncate: true, cascade: true })
}

module.exports = {
  restartUsersTable,
  closeConnection,
  createUser,
  resetUsers
}
