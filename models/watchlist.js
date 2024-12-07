const sequelize = require("../data/db");
const { DataTypes } = require("sequelize");

const Watchlist = sequelize.define("Watchlist");

module.exports = Watchlist;