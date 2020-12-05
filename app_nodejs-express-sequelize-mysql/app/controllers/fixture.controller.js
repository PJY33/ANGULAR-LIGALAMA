const db = require("../models");
const Fixture = db.fixtures;
//const L1team = db.l1teams;
//const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;

// création des fixtures en base (utilisé pour l'init en dev)
exports.createFixture = (homeL1TeamId, awayL1TeamId, roundId, fixture) => {
    return Fixture.create({
        fixture_idapif: fixture.idapif,
        event_date: fixture.event_date,
        goalsHomeTeam: fixture.goalsHomeTeam,
        goalsAwayTeam: fixture.goalsAwayTeam,
        status: fixture.status,
        roundId: roundId,
        awayL1TeamId: awayL1TeamId,
        homeL1TeamId: homeL1TeamId,
    })
        .then((fixture) => {
            console.log(">> Created fixture: " + JSON.stringify(fixture, null, 4));
            return fixture;
        })
        .catch((err) => {
            console.log(">> Error while creating fixture: ", err);
        });
};

// création des fixtures en base à partir du front
exports.createFixtureFromFront = (req, res) => {
    // Validate request
    if (!req.body.fixture_idapif) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Fixture
    const fixture = {
        fixture_idapif: req.body.fixture_idapif,
        event_date: req.body.event_date,
        goalsHomeTeam: req.body.goalsHomeTeam,
        goalsAwayTeam: req.body.goalsAwayTeam,
        status: req.body.status,
        awayL1TeamId: req.body.AwayL1TeamId,
        homeL1TeamId: req.body.HomeL1TeamId,
        roundId: req.body.roundId,
    };

    // Save Player in the database
    Fixture.create(fixture)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Fixture."
            });
        });
};
