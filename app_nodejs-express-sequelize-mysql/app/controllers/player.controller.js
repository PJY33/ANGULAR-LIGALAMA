const db = require("../models");
const Player = db.players;
const Round = db.rounds;
const Ligateam = db.ligateams;
const L1team = db.l1teams;
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;



// création des joueurs en base (utilisé pour l'init en dev)
exports.createPlayer = (ligateamId, l1teamId, player) => {
    return Player.create({
        player_idapif: player.player_idapif,
        player_name: player.player_name,
        position: player.position,
        state: player.state,
        point: player.point,
        ligateamId: ligateamId,
        l1teamId: l1teamId,
    })
        .then((player) => {
            console.log(">> Created player: " + JSON.stringify(player, null, 4));
            return player;
        })
        .catch((err) => {
            console.log(">> Error while creating player: ", err);
        });
};

// création des joueurs en base à partir du front
exports.createPlayerFromFront = (req, res) => {
    // Validate request
    if (!req.body.player_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Player
    const player = {
        player_idapif: req.body.player_idapif,
        player_name: req.body.player_name,
        position: req.body.position,
        state: req.body.state,
        point: req.body.point,
        l1teamId: req.body.l1teamId,
        ligateamId: req.body.ligateamId,
    };

    // Save Player in the database
    Player.create(player)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Player."
            });
        });
};


// Delete d'un joueur en base
exports.delete = (req, res) => {
    const id = req.params.id;

    Player.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Player was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Player with id=${id}. Maybe Player was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Player with id=" + id
            });
        });
};

// Retrieve all players from the database.
exports.findAll = (req, res) => {
  const player_name = req.query.player_name;
  const l1teamId = req.query.l1teamId;
  const position = req.query.position;
//  var condition = player_name ? { player_name: { [Op.like]: `%${player_name}%` } } : null;

    Player.findAll({
        include: [Ligateam, L1team],
        order: [
            [L1team, 'l1team_name', 'ASC'],
            ['position', 'ASC'],
            ['player_name', 'ASC']
        ],
        where: {
            l1teamId: {[Op.not]: null}
        }
    })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
              err.message || "Some error occurred while retrieving players."
        });
      });
};

// Retrieve all free l1team players from the database.
exports.findAllFreePlayers = (req, res) => {
    const player_name = req.query.player_name;
    const ligateamId = req.query.ligateamid;
    const l1teamId = req.query.l1teamId;
    const position = req.query.position;

    Player.findAll ({
        include: [L1team],
        order: [
            ['l1teamId', 'ASC'],
            ['position', 'ASC']
        ],
        where: {
            ligateamId: null,
            l1teamId: {[Op.not]: null}
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Free player"
            });
        });
};

// Retrieve a single Ligateam group by position
exports.findAllGroupByPos = (req, res) => {
    const id = req.params.id;
    const pos = req.params.pos;

    Player.findAll({
        attributes: ['position', [sequelize.fn('count', sequelize.col('id')), 'number']],
        group: ['position'],
        where: {
            ligateamId: id,
            state: pos
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
};

// Retrieve all free players of one l1team
exports.findAllPlayersOneL1team = (req, res) => {
    const id = req.params.id;
    const ligateamId = req.query.ligateamid;
    const l1teamId = req.query.l1teamId;
    const position = req.query.position;

    Player.findAll ({
        include: [L1team],
        order: [
            ['l1teamId', 'ASC'],
            ['position', 'ASC']
        ],
        where: {
            l1teamId: id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Free player"
            });
        });
};


// Retrieve all free players of one l1team
exports.findAllFreePlayersOneL1team = (req, res) => {
    const id = req.params.id;
    const ligateamId = req.query.ligateamid;
    const l1teamId = req.query.l1teamId;
    const position = req.query.position;

    Player.findAll ({
        include: [L1team],
        order: [
            ['l1teamId', 'ASC'],
            ['position', 'ASC']
        ],
        where: {
            ligateamId: null,
            l1teamId: id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Free player"
            });
        });
};


// Retrieve Player with ApiId
exports.findPlayersByApiFId = (req, res) => {
    const id = req.params.id;
    const player_idapif = req.query.player_idapif;

    Player.findAll ({
        where: {
            player_idapif: id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving this player"
            });
        });
};

exports.findAllFirstOneLigateam = (req, res) => {
    const id = req.params.id;
    const ligateamid = req.query.ligateamid;
    const state = req.query.state;
    const position = req.query.position;
    Player.findAll ({
        include: [Ligateam, L1team],
        order: [['position', 'ASC']],
        where: {
            ligateamid: id,
            state: "first"
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving player with ligateamid " + id
            });
        });
};

exports.findAllSubsOneLigateam = (req, res) => {
    const id = req.params.id;
    const ligateamid = req.query.ligateamid;
    const state = req.query.state;
    const position = req.query.position;
    Player.findAll ({
        include: [Ligateam, L1team],
        order: [['position', 'ASC']],
        where: {
            ligateamid: id,
            state: "substitute"
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving player with ligateamid " + id
            });
        });
};

exports.findOne = (req, res) => {
    const id = req.params.id;

    Player.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a single Player with id
exports.update = (req, res) => {
    const id = req.params.id;

    Player.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Player was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Player with id=${id}. Maybe Player was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Player with id=" + id
            });
        });
};

exports.findAllPlayersOneLigateam = (req, res) => {
    const id = req.params.id;
    const ligateamid = req.query.ligateamid;
    const position = req.query.position;
    Player.findAll ({
        include: [Ligateam, L1team],
        order: [['position', 'ASC']],
        where: {
            ligateamid: id,
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving player with ligateamid " + id
            });
        });
};

exports.findLigateamById = (ligateamId) => {
    return Ligateam.findByPk(ligateamId, { include: ["players"] })
        .then((ligateam) => {
            return ligateam;
        })
        .catch((err) => {
            console.log(">> Error while finding ligateam: ", err);
        });
};



// tuto association n:m =================================


/*

exports.create = (player) => {
    return Player.create({
        player_idapif: player.player_idapif,
        player_name: player.player_name,
        position: player.position,
        state: player.state,
    })
        .then((player) => {
            console.log(">> Created player: " + JSON.stringify(player, null, 4));
            return player;
        })
        .catch((err) => {
            console.log(">> Error while creating player: ", err);
        });
};

*/

// Retrieve a single Ligateam group by position
exports.findByIdWithRounds = (req, res) => {
    const id = req.params.id;
    const rd = req.params.rd;


    Player.findByPk(id, {
        include: [
            {
                model: Round,
                as: "rounds",
                where: { id: rd },
//                attributes: ["id", "round"],
                  attributes: ["id"],
                through: {
                  attributes: [
//                      "playerId",
//                      "roundId",
                      "totalPoint",
                      "teamPoint",
                      "teamGoalDifferencePoint",
                      "teamGoalConceded",
                      "playerPlayed",
                      "playerScored",
                      "playerKeyGoal",
                      "playerMultiScored",
                      "playerKeyPass",
                      "playerPenalty",
                      "playerRedCard"
                  ],
                },
            },
        ],
    })
        .then((player) => {
            res.send(player);
        })
        .catch((err) => {
            console.log(">> Error while finding Player: ", err);
        });
};

