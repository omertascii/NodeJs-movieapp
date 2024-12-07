const sequelize = require("../data/db");
const { DataTypes } = require("sequelize");

const Movies = sequelize.define(
    "Movies",{
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
                  msg: 'Tüm alanları doldurunuz!',
                },
              },
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: 'Tüm alanları doldurunuz!',
                },
              },
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: 'Tüm alanları doldurunuz!',
                },
              },
        },
        background: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: 'Tüm alanları doldurunuz!',
                },
              },
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: 'Tüm alanları doldurunuz!',
                },
              },
        },
        budget: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: 'Tüm alanları doldurunuz!',
                  isInt: { msg: "Budget alanı sayı ile girilmedilir!" }
                },
              },
        },
        is_home: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        date: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                  msg: 'Tüm alanları doldurunuz!',
                },
              },
            
        },
        GenreId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }
);

module.exports = Movies

