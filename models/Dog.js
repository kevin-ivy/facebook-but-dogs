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
          'name',
          //'location',
          'gender',
          'age',
          'breed',
          'about',
          'dogImage',
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
    /*location: {
      type: DataTypes.STRING,
      allowNull: false
    },*/
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
          len: [1]
      }
    },
    breed: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    about: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    dogImage: { 
      type: DataTypes.STRING,
      allowNull: false,
      //validate: {
      //isURL: true
      //}
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