const Sequelize = require('sequelize')
const config = require('../config/sequelize')

const db = {}
const sequelize = new Sequelize(config)

const UserModel = require('./User')(sequelize, Sequelize.DataTypes)
db[UserModel.name] = UserModel

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
