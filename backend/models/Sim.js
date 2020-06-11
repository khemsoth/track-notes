module.exports = function(sequelize, DataTypes) {

  const Sim = sequelize.define('Sim', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })
  return Sim;
  }