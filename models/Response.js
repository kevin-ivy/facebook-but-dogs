const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Response extends Model {}

Response.init(
  {
    // columns will go here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    //Send a brief message to the requester
    response_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1]
        }
    },
    //Include whether the request was accepted or denied
    accept: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    //Include the id for the sender
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    //Include the dog that was requested
    dog_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'dog',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'response'
  }
);

module.exports = Response;