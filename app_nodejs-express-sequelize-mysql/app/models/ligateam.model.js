module.exports = (sequelize, DataTypes) => {
  const T_ligateam = sequelize.define("ligateam", {
    ligateam_name: {
      type: DataTypes.STRING
    },
    points: {
      type: DataTypes.INTEGER
    },
    president: {
      type: DataTypes.STRING
    },
    conformity: {
      type: DataTypes.INTEGER
    }
  });
  return T_ligateam;
};
