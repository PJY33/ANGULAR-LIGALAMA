module.exports = app => {
  const ligateams = require("../controllers/ligateam.controller.js");
  const l1teams = require("../controllers/l1team.controller.js");
  const players = require("../controllers/player.controller.js");
  const fixtures = require("../controllers/fixture.controller.js");
  const events = require("../controllers/event.controller.js");
  const rounds = require("../controllers/round.controller");


  var router = require("express").Router();



  //==========================================================================================
  // Retrieve all Ligateams
  router.get("/ligateams/", ligateams.findAll);

  // Retrieve a single Ligateam with id
  router.get("/ligateams/:id", ligateams.findOne);

  // Update a single Ligateam with id
  router.put("/ligateams/:id", ligateams.update);

  //==========================================================================================
  // Retrieve all Players
  router.get("/players/", players.findAll);

  // Retrieve all Free Players
  router.get("/players/free", players.findAllFreePlayers);

  // Retrieve all Free Players of a L1team with id
  router.get("/players/l1teams/:id", players.findAllPlayersOneL1team);

  // Retrieve all Free Players of a L1team with id
  router.get("/players/l1teams/:id/free", players.findAllFreePlayersOneL1team);

  // Retrieve a single Ligateam group by position
  router.get("/players/ligateams/:id/:pos/groupbyposition", players.findAllGroupByPos);

  // Retrieve a single Ligateam with id
  // router.get("/players/:id", players.findOne);

  // Retrieve a single Ligateam with idApiF
  router.get("/players/:id/apif", players.findPlayersByApiFId);

  // Retrieve all first-team Players of a ligateam with id
  router.get("/players/ligateams/:id/first", players.findAllFirstOneLigateam);

  // Retrieve all substitute Players of a ligateam with id
  router.get("/players/ligateams/:id/substitute", players.findAllSubsOneLigateam);

  // Retrieve all Players of a ligateam
  router.get("/players/ligateams/:id", players.findAllPlayersOneLigateam);

  // Update a single Player with id
  router.put("/players/:id", players.update);

  // Create a Player
  router.post("/players", players.createPlayerFromFront);

  // Delete a Player
  router.delete("/players/:id", players.delete);

  //==========================================================================================
  // create a L1team
  router.post("/l1teams/", l1teams.createTeamFromFront);

  // Retrieve all L1team
  router.get("/l1teams/", l1teams.findAll);

  // Retrieve a single Ligateam with idApiF

  // Retrieve a single L1team with Id
  router.get("/l1teams/:id", l1teams.findOne);

  // Retrieve a single L1team with Id
  router.get("/l1teams/:id/apif", l1teams.findL1teamByApiFId);


  //==========================================================================================
  // create a Fixture
  //router.post("/fixtures", fixtures.createFixtureFromFront);

  //==========================================================================================
  // create an Event
  //router.post("/events", events.createEventFromFront);

  // Retrieve a single Player within a Round
  router.get("/players/:id/rounds/:rd", players.findByIdWithRounds);

  // Create a Player
  router.post("/playerround", rounds.addPlayerFromFront);

  app.use('/api', router);
};
