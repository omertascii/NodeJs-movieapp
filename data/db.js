const mysql = require("mysql2")
const Sequelize = require("sequelize");
const config = require("config")



const sequelize = new Sequelize(process.env.JAWSDB_URL,{
    dialect: "mysql"
});

module.exports = sequelize;