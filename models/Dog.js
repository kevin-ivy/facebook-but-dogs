const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Dog model
class Dog extends Model {
  static upbone(body, models) {
    return models.Bone.create({
      user_id: body.user_id,
      dog_id: body.dog_id
    }).then(() => {
      return Dog.findOne({
        where: {
          id: body.dog_id
        },
        attributes: [
          'id',
          'dog_url',
          'name',
          'created_at',
          [
            sequelize.literal('(SELECT COUNT(*) FROM bone WHERE dog.id = bone.dog_id)'),
            'bone_count'
          ]
        ]
      });
    });
  }
}

// create fields/columns for Dog model
Dog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false
    },
    about: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long
        len: [4,150]
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'dog'
  }
);

module.exports = Dog;