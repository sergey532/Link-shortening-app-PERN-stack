const Sequelize = require("sequelize")

module.exports = new Sequelize("pern", "sysadmin", "syspassword", {
  dialect: "postgres",
  host: "localhost"  
});