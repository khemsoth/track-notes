module.exports = function(sequelize, DataTypes) {

  const Note = sequelize.define('Note', {
    sim: {
      type: DataTypes.STRING,
      allowNull: false
    },
    car: {
      type: DataTypes.STRING,
      allowNull: false
    },
    track: {
      type: DataTypes.STRING,
      allowNull: false
    },
    setupName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    goals: {
      type: DataTypes.STRING,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    session: {
      type: DataTypes.STRING,
      allowNull: false
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: false
    },
  })
  return Note;
  }