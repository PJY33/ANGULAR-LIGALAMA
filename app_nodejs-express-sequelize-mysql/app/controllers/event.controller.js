const db = require("../models");
const Event = db.events;
//const L1team = db.l1teams;
//const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

// création des fixtures en base (utilisé pour l'init en dev)
exports.createEvent = (fixtureId, event) => {
    return Event.create({
        fixtureId: fixtureId,
        elapsed: event.elapsed,
        team_idapif: event.team_idapif,
        teamName: event.teamName,
        player_idapif: event.player_idapif,
        player_name: event.player_name,
        assist_idapif: event.assist_idapif,
        assist_name: event.assist_name,
        type: event.type,
        detail: event.detail,
    })
        .then((event) => {
            console.log(">> Created event: " + JSON.stringify(event, null, 4));
            return event;
        })
        .catch((err) => {
            console.log(">> Error while creating event: ", err);
        });
};

// création des fixtures en base à partir du front
exports.createEventFromFront = (req, res) => {
    // Validate request
    if (!req.body.fixtureId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Fixture
    const event = {
        fixtureId: req.body.fixtureId,
        elapsed: req.body.elapsed,
        team_idapif: req.body.team_idapif,
        teamName: req.body.teamName,
        player_idapif: req.body.player_idapif,
        player_name: req.body.player_name,
        assist_idapif: req.body.assist_idapif,
        assist_name: req.body.assist_name,
        type: req.body.type,
        detail: req.body.detail,
    };

    // Save Player in the database
    Event.create(event)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Event."
            });
        });
};
