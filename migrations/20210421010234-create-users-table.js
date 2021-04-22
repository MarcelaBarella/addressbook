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
        type: DataTypes.STRING,
        allowNull: false,
        required: true,
        unique: true,
        validate: {
            isEmail: true,
            notEmpty: true
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        required: true
      }
    },
    {
      freezeTableName: true
    }),
  down: queryInterface => queryInterface.dropTable(tableName),
}