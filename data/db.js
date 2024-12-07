const mysql = require("mysql2")
const Sequelize = require("sequelize");
const config = require("config")



const sequelize = new Sequelize(config.db.url,{
    dialect: "mysql",

});

module.exports = sequelize;