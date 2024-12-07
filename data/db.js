const mysql = require("mysql2")
const Sequelize = require("sequelize");
const config = require("config")



const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password,{
    dialect: "mysql",
    storage: "./session.mysql"
});

module.exports = sequelize;