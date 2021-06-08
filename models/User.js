const Sequelize = require("sequelize")
const db = require('../db')
const Link = require('../models/Link')

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    /*validate: {
      isEmail: true,
      msg: "Error: incorrect Email"
    }*/
  },
  password: {
    type: Sequelize.STRING(64),
    allowNull: false,
    //is: /^[0-9a-f]{64}$/i
  }
  
});
User.hasMany(Link, {onDelete: "cascade"}); //связь один ко многим
module.exports = User;