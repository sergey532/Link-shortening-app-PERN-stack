const Sequelize = require("sequelize")
const db = require('../db')
const User = require('../models/User')

const Link = db.define("links", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  from: {
    type: Sequelize.STRING,
    allowNull: false
  },
  to: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  code: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  clicks: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
})

//Link.belongsTo(User, {foreignKey: 'userId'})


module.exports = Link;