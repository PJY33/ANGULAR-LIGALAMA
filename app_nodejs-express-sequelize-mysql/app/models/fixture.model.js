module.exports = (sequelize, DataTypes) => {
  const T_fixture = sequelize.define("fixture", {
    fixture_idapif: {
      type: DataTypes.INTEGER
    },
    goalsHomeTeam: {
      type: DataTypes.INTEGER
    },
    goalsAwayTeam: {
      type: DataTypes.INTEGER
    },
    event_date: {
      type: DataTypes.DATE
    },
    status: {
      type: DataTypes.STRING
    }
  });
  return T_fixture;
};
