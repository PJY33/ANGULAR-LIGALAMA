const db = require("../models");
const L1team = db.l1teams;
const Player = db.players;

const Op = db.Sequelize.Op;

// init des équipes de l1
exports.createL1team = (l1team) => {
    return L1team.create({
        l1team_name: l1team.l1team_name,
    })
        .then((l1team) => {
            console.log(">> Created l1team: " + JSON.stringify(l1team, null, 4));
            return l1team;
        })
        .catch((err) => {
            console.log(">> Error while creating l1team: ", err);
        });
};

// création des équipes à partir du front
exports.createTeamFromFront = (req, res) => {
    // Validate request
    if (!req.body.l1team_name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Team
    const team = {
        l1team_name: req.body.l1team_name,
        team_idapif: req.body.team_idapif,
        logo: req.body.logo,
    };

    // Save Player in the database
    L1team.create(team)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Team."
            });
        });
};


/// fonctions utilisées par les API
exports.create = (req, res) => {
    // Validate request
    if (!req.body.l1team_name) {
        res.status(400).send({
            message: "l1team content can not be empty!"
        });
        return;
    }

    // Create a l1team
    const l1team = {
        l1team_name: req.body.l1team_name
    };

    // Save l1team in the database
    L1team.create(l1team)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Tutorial."
            });
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const l1team_name = req.query.l1team_name;
  console.log(l1team_name);
  var condition = l1team_name ? { l1team_name: { [Op.like]: `%${l1team_name}%` } } : null;

  L1team.findAll({ order: [['l1team_name', 'ASC']], where: condition })
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

exports.findOne = (req, res) => {
    const id = req.params.id;

    L1team.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};


// Retrieve Player with ApiId
exports.findL1teamByApiFId = (req, res) => {
    const id = req.params.id;

    L1team.findAll ({
        where: {
            team_idapif: id
        }
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving this l1team"
            });
        });
};

