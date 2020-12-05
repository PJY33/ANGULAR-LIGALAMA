const db = require("../models");
const Ligateam = db.ligateams;
const Player = db.players;

const Op = db.Sequelize.Op;

// init des équipes de la liga
exports.createLigateam = (ligateam) => {
    return Ligateam.create({
        ligateam_name: ligateam.ligateam_name,
        points: ligateam.points,
        president: ligateam.president,
        conformity: ligateam.conformity,
    })
        .then((ligateam) => {
            console.log(">> Created ligateam: " + JSON.stringify(ligateam, null, 4));
            return ligateam;
        })
        .catch((err) => {
            console.log(">> Error while creating ligateam: ", err);
        });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const ligateam_name = req.query.ligateam_name;
  const points = req.query.points;
  var condition = ligateam_name ? { ligateam_name: { [Op.like]: `%${ligateam_name}%` } } : null;

    Ligateam.findAll({ order: [['points', 'DESC']], where: condition })
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

    Ligateam.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};

// Update a single Ligateam with id
exports.update = (req, res) => {
    const id = req.params.id;

    Ligateam.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Ligateam was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Ligateam with id=${id}. Maybe Ligateam was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Ligateam with id=" + id
            });
        });
};
