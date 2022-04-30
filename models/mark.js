const { DataTypes } = require('sequelize')

module.exports = model;

function model(sequelize) {
  const attributes = {
    exam_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    mark: { type: DataTypes.STRING, allowNull: false }
  }
  return sequelize.define('mark', attributes, { timestamps: false })
}

