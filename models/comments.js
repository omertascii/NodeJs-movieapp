const sequelize = require("../data/db");
const { DataTypes } = require("sequelize");

const Comments = sequelize.define("Comments", {
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
});

module.exports = Comments;