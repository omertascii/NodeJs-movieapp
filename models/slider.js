const sequelize = require("../data/db");
const { DataTypes } = require("sequelize");

const Slider = sequelize.define("Slider",{
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Slider;