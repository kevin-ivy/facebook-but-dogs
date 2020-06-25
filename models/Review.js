const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Review extends Model {}

Review.init(
  {
    // columns will go here
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    review_text: {
        type: DataTypes.STRING,
        allowNull: false,
        validte: {
            len: [1]
        }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id'
      }
    },
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
    modelName: 'review'
  }
);

module.exports = Review;