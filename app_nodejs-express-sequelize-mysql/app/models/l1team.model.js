module.exports = (sequelize, DataTypes) => {
  const T_l1team = sequelize.define("l1team", {
    l1team_name: {
      type: DataTypes.STRING
    },
    team_idapif: {
      type: DataTypes.INTEGER
    },
    logo: {
      type: DataTypes.STRING
    }
  });
  return T_l1team;
};
