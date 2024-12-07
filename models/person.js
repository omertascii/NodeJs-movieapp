const sequelize = require("../data/db");
const { DataTypes } = require("sequelize");

const Person = sequelize.define("Person",{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'Name alanını doldurunuz!',
            },
          },
    },
    biography: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'Biography alanını doldurunuz!',
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
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'İmage alanını doldurunuz!',
            },
          },
    },
    birthday: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'Birthday alanını doldurunuz!',
            },
          },
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'City alanını doldurunuz!',
            },
          },
    },
    gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'Gender alanını doldurunuz!',
            },
          },
    },
    duty_types: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
              msg: 'Duty Type alanını doldurunuz!',
            },
          },
    }
});

module.exports = Person;