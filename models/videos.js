const sequelize = require("../data/db");
const { DataTypes } = require("sequelize");

const Videos = sequelize.define("Videos",{
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'Title alanını doldurunuz!',
            },
          },
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'Url alanını doldurunuz!',
            },
          },
    }
});

module.exports = Videos;