const sequelize = require("../data/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("User",{
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'Nickname alanını doldurunuz!',
            },
          },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'Password alanını doldurunuz!',
            }
          },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'Email alanını doldurunuz!',
            },
            isEmail: { msg: "Mail formatında giriniz" }
          },
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "not_user.jpg"
    },
    resetToken: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    resetTokenExpiration: {
        type: DataTypes.DATE,
        allowNull: true
    }
});


module.exports = User;