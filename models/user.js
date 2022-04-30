const { DataTypes } = require('sequelize')

module.exports = model;

function model(sequelize) {
  const attributes = {
    firstname: { type: DataTypes.STRING, allowNull: false },
    lastname: { type: DataTypes.STRING, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    user_type: { type: DataTypes.STRING, allowNull: false },
    hash: { type: DataTypes.STRING, allowNull: false }
  };

  const options = {
    defaultScope: {
      // exclude hash by default
      attributes: { exclude: ['hash'] }
    },
    scopes: {
      // include hash with this scope
      withHash: { attributes: {}, }
    },
    timestamps: false
  };

  return sequelize.define('user', attributes, options)
}
