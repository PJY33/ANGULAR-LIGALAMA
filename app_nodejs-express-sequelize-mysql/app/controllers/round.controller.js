const db = require("../models");
const Round = db.rounds;
const Player = db.players;
const player = require("../controllers/player.controller");

const Op = db.Sequelize.Op;

// init des Rounds
exports.createRound = (round) => {
    return Round.create({
        round: round.round,
    })
        .then((round) => {
            console.log(">> Created round: " + JSON.stringify(round, null, 4));
            return round;
        })
        .catch((err) => {
            console.log(">> Error while creating round: ", err);
        });
};



// tuto =====================================================================
/*
exports.create = (round) => {
    return Round.create({
        round: round.round,
    })
        .then((round) => {
            console.log(">> Created Round: " + JSON.stringify(round, null, 2));
            return round;
        })
        .catch((err) => {
            console.log(">> Error while creating Round: ", err);
        });
};
*/




exports.addPlayer = (roundid, playerId) => {
    return Round.findByPk(roundid)
        .then((round) => {
            if (!round) {
                console.log("Round not found!");
                return null;
            }
            return Player.findByPk(playerId).then((player) => {
                if (!player) {
                    console.log("Player not found!");
                    return null;
                }

                round.addPlayer(player, {through: {
                        totalPoint: 27,
                        teamPoint: 1,
                        teamGoalDifferencePoint: 2,
                        teamGoalConceded: 3,
                        playerPlayed: 4,
                        playerScored: 5,
                        playerKeyGoal: 6,
                        playerMultiScored: 7,
                        playerKeyPass: 8,
                        playerPenalty: 9,
                        playerRedCard: 10,
                    }
                });
                console.log(`>> added Player id=${player.id} to Round id=${round.id}`);
                return round;
            });
        })
        .catch((err) => {
            console.log(">> Error while adding Player to Round: ", err);
        });
};

// création des joueurs en base à partir du front
exports.addPlayerFromFront = (req, res) => {
    // Validate request
    if (!req.body.teamPoint) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    const playerId = req.body.playerId;
    const roundId = req.body.roundId;

    return Round.findByPk(roundId)
        .then((round) => {
            if (!round) {
                console.log("Round not found!");
                return res.status(422).json( `Round not found`);
            }
            return Player.findByPk(playerId).then((player) => {
                if (!player) {
                    console.log("Player not found!");
                    return res.status(422).json( `Player not found`);
                }

                round.addPlayer(player, {through: {
                        totalPoint: req.body.totalPoint,
                        teamPoint: req.body.teamPoint,
                        teamGoalDifferencePoint: req.body.teamGoalDifferencePoint,
                        teamGoalConceded: req.body.teamGoalConceded,
                        playerPlayed: req.body.playerPlayed,
                        playerScored: req.body.playerScored,
                        playerKeyGoal: req.body.playerKeyGoal,
                        playerMultiScored: req.body.playerMultiScored,
                        playerKeyPass: req.body.playerKeyPass,
                        playerPenalty: req.body.playerPenalty,
                        playerRedCard: req.body.playerRedCard,
                    }
                });
                return res.status(200).json( `Enregistrement créé pour le playerId=${player.id} et roundId=${round.id}`);

            });
        })
        .catch((err) => {
            console.log(">> Error while adding Player to Round: ", err);
        });

};
