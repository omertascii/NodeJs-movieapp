const sequelize = require("../data/db");
const { DataTypes } = require("sequelize");

const Genre = sequelize.define("Genre",{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'Name alanını doldurunuz!',
            },
          },
    }
}
);

module.exports = Genre;