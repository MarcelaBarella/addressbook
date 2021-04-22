const Sequelize = require('sequelize');
require('dotenv').config();

const db = {}
const sequelize = new Sequelize(process.env.DATABASE_URL)

const UserModel = require('./User')(sequelize, Sequelize.DataTypes);
db[UserModel.name] = UserModel;


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
