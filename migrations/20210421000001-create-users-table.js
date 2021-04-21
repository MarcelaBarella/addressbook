const { DataTypes } = require('sequelize')

const tableName = 'users'

module.exports = {
  up: (queryInterface, { DataTypes: { STRING } }) =>
    queryInterface.createTable(tableName, {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: STRING,
        allowNull: false,
        required: true
      },
      password: {
        type: STRING,
        allowNull: false,
        required: true,
      }
    }),
  down: queryInterface => queryInterface.dropTable(tableName),
}