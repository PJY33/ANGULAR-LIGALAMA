module.exports = (sequelize, DataTypes) => {
  const T_event = sequelize.define("event", {
    elapsed: {
      type: DataTypes.INTEGER
    },
    team_idapif: {
      type: DataTypes.INTEGER
    },
    teamName: {
      type: DataTypes.STRING
    },
    player_idapif: {
      type: DataTypes.INTEGER
    },
    player_name: {
      type: DataTypes.STRING
    },
    assist_idapif: {
      type: DataTypes.INTEGER
    },
    assist_name: {
      type: DataTypes.STRING
    },
    type: {
      type: DataTypes.STRING
    },
    detail: {
      type: DataTypes.STRING
    }
  });
  return T_event;
};
