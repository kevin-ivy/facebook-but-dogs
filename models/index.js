const User = require('./User');
const Dog = require('./Dog');
const Bone = require('./Bones');
const Review = require('./Review');
const Date = require('./Date');
const Response = require('./Response');

// create associations
User.hasMany(Dog, {
    foreignKey: 'user_id'
});

Dog.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Dog, {
  through: Bone,
  as: 'boned_dogs',
  foreignKey: 'user_id'
});

Dog.belongsToMany(User, {
  through: Bone,
  as: 'boned_dogs',
  foreignKey: 'dog_id'
});


Bone.belongsTo(User, {
  foreignKey: 'user_id'
});

Bone.belongsTo(Dog, {
  foreignKey: 'dog_id',
  onDelete: 'CASCADE'
});

User.hasMany(Bone, {
  foreignKey: 'user_id'
});

Dog.hasMany(Bone, {
  foreignKey: 'dog_id'
});


Review.belongsTo(User, {
  foreignKey: 'user_id'
});

Review.belongsTo(Dog, {
  foreignKey: 'dog_id',
  onDelete: 'CASCADE'
});

User.hasMany(Review, {
  foreignKey: 'user_id'
});

Dog.hasMany(Review, {
  foreignKey: 'dog_id'
});

Date.belongsTo(User, {
  foreignKey: 'user_id'
});

Date.belongsTo(Dog, {
  foreignKey: 'dog_id',
  onDelete: 'CASCADE'
});

User.hasMany(Date, {
  foreignKey: 'user_id'
});

Dog.hasMany(Date, {
  foreignKey: 'dog_id'
});

Response.belongsTo(User, {
  foreignKey: 'user_id'
});

Response.belongsTo(Dog, {
  foreignKey: 'dog_id'
});

User.hasMany(Response, {
  foreignKey: 'user_id'
});

Dog.hasMany(Response, {
  foreignKey: 'dog_id',
  onDelete: 'CASCADE'
});

module.exports = { User, Dog, Bone, Review, Date };