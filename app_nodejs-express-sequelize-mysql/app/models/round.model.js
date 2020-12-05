module.exports = (sequelize, DataTypes) => {
  const T_round = sequelize.define("round", {
    round: {
      type: DataTypes.STRING
    }
  });
  return T_round;
};
