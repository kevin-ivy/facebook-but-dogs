const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Date extends Model {}

Date.init(
  {
    // columns will go here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    //Include brief message for recipient
    date_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    //Include user_id for the sender
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    //Include ID for dog being requested
    dog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dog',
        key: 'id'
      }
    },
    //See if the date was accepted or declined
    accept: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
      //See if the date has a response at all
      responded: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'date'
  }
);

module.exports = Date;