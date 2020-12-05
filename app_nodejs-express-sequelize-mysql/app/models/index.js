const dbConfig = require("../config/db.config.js");
var DataTypes = require('sequelize/lib/data-types');

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
//  define: {
//    underscored: true
//  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.ligateams = require("./ligateam.model.js")(sequelize, Sequelize);
db.l1teams = require("./l1team.model.js")(sequelize, Sequelize);
db.players = require("./player.model.js")(sequelize, Sequelize);
db.rounds = require("./round.model")(sequelize, Sequelize);



db.ligateams.hasMany(db.players);
db.players.belongsTo(db.ligateams);

db.l1teams.hasMany(db.players);
db.players.belongsTo(db.l1teams);

const players_rounds = sequelize.define('players_rounds', {
  totalPoint: DataTypes.INTEGER,
  teamPoint: DataTypes.INTEGER,
  teamGoalDifferencePoint: DataTypes.INTEGER,
  teamGoalConceded: DataTypes.INTEGER,
  playerPlayed: DataTypes.INTEGER,
  playerScored: DataTypes.INTEGER,
  playerKeyGoal: DataTypes.INTEGER,
  playerMultiScored: DataTypes.INTEGER,
  playerKeyPass: DataTypes.INTEGER,
  playerPenalty: DataTypes.INTEGER,
  playerRedCard: DataTypes.INTEGER
});
db.players.belongsToMany(db.rounds, {
  through: "players_rounds",
  as: "rounds",
  foreignKey: "playerId",
});
db.rounds.belongsToMany(db.players, {
  through: "players_rounds",
  as: "players",
  foreignKey: "roundId",
});

/*
const PlayerRound = sequelize.define('PlayerRound', {
  teamPoint: DataTypes.INTEGER,
  teamGoalDifferencePoint: DataTypes.INTEGER,
  teamGoalConceded: DataTypes.INTEGER,
  playerPlayed: DataTypes.INTEGER,
  playerScored: DataTypes.INTEGER,
  playerKeyGoal: DataTypes.INTEGER,
  playerMultiScored: DataTypes.INTEGER,
  playerKeyPass: DataTypes.INTEGER,
  playerPenalty: DataTypes.INTEGER,
  playerRedCard: DataTypes.INTEGER
}, { timestamps: false });
db.players.belongsToMany(db.rounds, { through: PlayerRound });
db.rounds.belongsToMany(db.players, { through: PlayerRound });
*/


module.exports = db;

