module.exports = (sequelize, DataTypes) => {
  const T_player = sequelize.define("player", {
    player_idapif: {
      type: DataTypes.INTEGER
    },
    player_name: {
      type: DataTypes.STRING
    },
    position: {
      type: DataTypes.STRING
    },
    state: {
      type: DataTypes.STRING
    },
    point: {
      type: DataTypes.INTEGER
    },
  });
  return T_player;
};
