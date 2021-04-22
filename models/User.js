module.exports = (sequelize, DataTypes) =>
  sequelize.define('user', {
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
  })