const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(bodyParser.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const controller = require("./app/controllers/tutorial.controller");
const controllerl1team = require("./app/controllers/l1team.controller");
const controllerligateam = require("./app/controllers/ligateam.controller");
const controllerPlayer = require("./app/controllers/player.controller");
//const controllerFixture = require("./app/controllers/fixture.controller");
const controllerRound = require("./app/controllers/round.controller");
//const controllerEvent = require("./app/controllers/event.controller");


const run = async () => {


// Insertion des équipes de ligue 1
  const round1 = await controllerRound.createRound ({
    round: "Regular_Season_-_1",
  });
  const round2 = await controllerRound.createRound ({
    round: "Regular_Season_-_2",
  });
  const round3 = await controllerRound.createRound ({
    round: "Regular_Season_-_3",
  });
  const round4 = await controllerRound.createRound ({
    round: "Regular_Season_-_4",
  });
  const round5 = await controllerRound.createRound ({
    round: "Regular_Season_-_5",
  });
  const round6 = await controllerRound.createRound ({
    round: "Regular_Season_-_6",
  });
  const round7 = await controllerRound.createRound ({
    round: "Regular_Season_-_7",
  });
  const round8 = await controllerRound.createRound ({
    round: "Regular_Season_-_8",
  });
  const round9 = await controllerRound.createRound ({
    round: "Regular_Season_-_9",
  });
  const round10 = await controllerRound.createRound ({
    round: "Regular_Season_-_10",
  });
  const round11 = await controllerRound.createRound ({
    round: "Regular_Season_-_11",
  });
  const round12 = await controllerRound.createRound ({
    round: "Regular_Season_-_12",
  });
  const round13 = await controllerRound.createRound ({
    round: "Regular_Season_-_13",
  });
  const round14 = await controllerRound.createRound ({
    round: "Regular_Season_-_14",
  });
  const round15 = await controllerRound.createRound ({
    round: "Regular_Season_-_15",
  });
  const round16= await controllerRound.createRound ({
    round: "Regular_Season_-_16",
  });
  const round17 = await controllerRound.createRound ({
    round: "Regular_Season_-_17",
  });
  const round18 = await controllerRound.createRound ({
    round: "Regular_Season_-_18",
  });
  const round19 = await controllerRound.createRound ({
    round: "Regular_Season_-_19",
  });
  const round20 = await controllerRound.createRound ({
    round: "Regular_Season_-_20",
  });
  const round21 = await controllerRound.createRound ({
    round: "Regular_Season_-_21",
  });
  const round22 = await controllerRound.createRound ({
    round: "Regular_Season_-_22",
  });
  const round23 = await controllerRound.createRound ({
    round: "Regular_Season_-_23",
  });
  const round24 = await controllerRound.createRound ({
    round: "Regular_Season_-_24",
  });
  const round25 = await controllerRound.createRound ({
    round: "Regular_Season_-_25",
  });
  const round26 = await controllerRound.createRound ({
    round: "Regular_Season_-_26",
  });
  const round27 = await controllerRound.createRound ({
    round: "Regular_Season_-_27",
  });
  const round28 = await controllerRound.createRound ({
    round: "Regular_Season_-_28",
  });
  const round29 = await controllerRound.createRound ({
    round: "Regular_Season_-_29",
  });
  const round30 = await controllerRound.createRound ({
    round: "Regular_Season_-_30",
  });
  const round31 = await controllerRound.createRound ({
    round: "Regular_Season_-_31",
  });
  const round32 = await controllerRound.createRound ({
    round: "Regular_Season_-_32",
  });
  const round33 = await controllerRound.createRound ({
    round: "Regular_Season_-_33",
  });
  const round34 = await controllerRound.createRound ({
    round: "Regular_Season_-_34",
  });
  const round35 = await controllerRound.createRound ({
    round: "Regular_Season_-_35",
  });
  const round36 = await controllerRound.createRound ({
    round: "Regular_Season_-_36",
  });
  const round37 = await controllerRound.createRound ({
    round: "Regular_Season_-_37",
  });
  const round38 = await controllerRound.createRound ({
    round: "Regular_Season_-_38",
  });


/*
// Insertion des équipes de ligue 1
  const l1team1 = await controllerl1team.createL1team ({
    l1team_name: "RENNES",
  });
  const l1team2 = await controllerl1team.createL1team ({
    l1team_name: "LILLE",
  });
  const l1team3 = await controllerl1team.createL1team ({
    l1team_name: "LENS",
  });
  const l1team4 = await controllerl1team.createL1team ({
    l1team_name: "PARIS-SG",
  });
  const l1team5 = await controllerl1team.createL1team ({
    l1team_name: "MONTPELLIER",
  });
  const l1team6 = await controllerl1team.createL1team ({
    l1team_name: "MONACO",
  });
  const l1team7 = await controllerl1team.createL1team ({
    l1team_name: "SAINT-ETIENNE",
  });
  const l1team8 = await controllerl1team.createL1team ({
    l1team_name: "NICE",
  });
  const l1team9 = await controllerl1team.createL1team ({
    l1team_name: "BORDEAUX",
  });
  const l1team10 = await controllerl1team.createL1team ({
    l1team_name: "MARSEILLE",
  });
  const l1team11 = await controllerl1team.createL1team ({
    l1team_name: "BREST",
  });
  const l1team12 = await controllerl1team.createL1team ({
    l1team_name: "ANGERS",
  });
  const l1team13 = await controllerl1team.createL1team ({
    l1team_name: "NIMES",
  });
  const l1team14 = await controllerl1team.createL1team ({
    l1team_name: "LYON",
  });
  const l1team15 = await controllerl1team.createL1team ({
    l1team_name: "METZ",
  });
  const l1team16 = await controllerl1team.createL1team ({
    l1team_name: "REIMS",
  });
  const l1team17 = await controllerl1team.createL1team ({
    l1team_name: "NANTES",
  });
  const l1team18 = await controllerl1team.createL1team ({
    l1team_name: "LORIENT",
  });
  const l1team19 = await controllerl1team.createL1team ({
    l1team_name: "STRASBOURG",
  });
  const l1team20 = await controllerl1team.createL1team ({
    l1team_name: "DIJON",
  });

  // Insertion des fixtures
  const fixture1 = await controllerFixture.createFixture(l1team1.id, l1team2.id, round34.id, {
    fixture_idapif: "1234",
    event_date: "2020-10-02T20:00:00+01:00",
    goalsHomeTeam: 2,
    goalsAwayTeam: 0,
    status: "Match Finished",
  });



  // Insertion des events
  const event1 = await controllerEvent.createEvent(fixture1.id, {
    elapsed: 68,
    team_idapif: 77,
    teamName: "Angers",
    player_idapif: 20633,
    player_name: "J. Cabot",
    assist_idapif: null,
    assist_name: null,
    type: "Card",
    detail: "Yellow Card",
  });
*/

  // Insertion des équipes de ligue Liga
  const ligateam1 = await controllerligateam.createLigateam({
    ligateam_name: "Les CRABES",
    points: 365,
    president: "Pascal JAFFRY",
    conformity: 0,
  });
  const ligateam2 = await controllerligateam.createLigateam({
    ligateam_name: "Le RIVER GODASSE",
    points: 452,
    president: "Eric PANOUILLERE",
    conformity: 0,
  });
  const ligateam3 = await controllerligateam.createLigateam({
    ligateam_name: "Le DCE",
    points: 126,
    president: "Denis CADAUGADE",
    conformity: 0,
  });
  const ligateam4 = await controllerligateam.createLigateam({
    ligateam_name: "Le TAZ",
    points: 745,
    president: "Jean-Louis GAMARD",
    conformity: 0,
  });
  const ligateam5 = await controllerligateam.createLigateam({
    ligateam_name: "La MEUTE DES LOUPS",
    points: 347,
    president: "Matthieu CARALP",
    conformity: 0,
  });
  const ligateam6 = await controllerligateam.createLigateam({
    ligateam_name: "Le RAPID LOUVIGNY",
    points: 653,
    president: "Jean-Marc DESPOMAREDES",
    conformity: 0,
  });
  const ligateam7 = await controllerligateam.createLigateam({
    ligateam_name: "Le SAPHS",
    points: 222,
    president: "Pascal LOAREC",
    conformity: 0,
  });
  const ligateam8 = await controllerligateam.createLigateam({
    ligateam_name: "L'OSA",
    points: 553,
    president: "Paul SEVAL",
    conformity: 0,
  });
  const ligateam9 = await controllerligateam.createLigateam({
    ligateam_name: "TORPEDO",
    points: 444,
    president: "Jean-Paul LABARRERE",
    conformity: 0,
  });
  const ligateam10 = await controllerligateam.createLigateam({
    ligateam_name: "Le GEEK",
    points: 631,
    president: "Théo PANOUILLERE",
    conformity: 0,
  });
  const ligateam11 = await controllerligateam.createLigateam({
    ligateam_name: "L'ACMALIN",
    points: 237,
    president: "Jean-Marc MONMIREL",
    conformity: 0,
  });
  const ligateam12 = await controllerligateam.createLigateam({
    ligateam_name: "Le BRIVESC",
    points: 335,
    president: "Joël CHATRAS",
    conformity: 0,
  });


  // Insertion de joueurs ayant une équipe de ligue 1 + une équipe liga
  // Si on utilise la création auto AVEC la création des l1team par node.js
  // il faut le faire ainsi ...
  // const player1 = await controllerPlayer.createPlayer(ligateam1.id, l1team14.id, {
  //   player_name: "Grégory COUPET",
  //   position: "Goalkeeper",
  //   state: "first",
  // });

/*

  // Insertion de joueurs ayant une équipe de ligue 1 + une équipe liga
  // note : la je valorise le second champ avec un id de l1team en dur
  const player1 = await controllerPlayer.createPlayer(ligateam1.id, 1, {
    player_name: "Grégory COUPET",
    position: "Goalkeeper",
    state: "first",
  });
  const player2 = await controllerPlayer.createPlayer(ligateam1.id, 1, {
    player_name: "Carlos MOSER",
    position: "Defender",
    state: "first",
  });
  const player3 = await controllerPlayer.createPlayer(ligateam1.id, 3, {
    player_name: "Maxime BOSSIS",
    position: "Defender",
    state: "first",
  });
  const player4 = await controllerPlayer.createPlayer(ligateam1.id, 3, {
    player_name: "Eric DI MECO",
    position: "Defender",
    state: "first",
  });
  const player5 = await controllerPlayer.createPlayer(ligateam1.id, 12, {
    player_name: "Roberto CARLOS",
    position: "Defender",
    state: "first",
  });
  const player6 = await controllerPlayer.createPlayer(ligateam1.id, 14, {
    player_name: "Michel PLATINI",
    position: "Mildfielder",
    state: "first",
  });
  const player7 = await controllerPlayer.createPlayer(ligateam1.id, 17, {
    player_name: "Zinedine ZIDANE",
    position: "Mildfielder",
    state: "first",
  });
  const player8 = await controllerPlayer.createPlayer(ligateam1.id, 17, {
    player_name: "Angel DI MARIA",
    position: "Mildfielder",
    state: "first",
  });
  const player9 = await controllerPlayer.createPlayer(ligateam1.id, 18, {
    player_name: "Robert PIRES",
    position: "Mildfielder",
    state: "substitute",
  });
  const player10 = await controllerPlayer.createPlayer(ligateam1.id, 9, {
    player_name: "Marco VAN BASTEN",
    position: "Attacker",
    state: "first",
  });
  const player11 = await controllerPlayer.createPlayer(ligateam1.id, 9, {
    player_name: "Jean-Pierre PAPIN",
    position: "Attacker",
    state: "first",
  });
  const player12 = await controllerPlayer.createPlayer(ligateam1.id, 1, {
    player_name: "Alan SHERER",
    position: "Attacker",
    state: "first",
  });
  const player13 = await controllerPlayer.createPlayer(ligateam2.id, 1, {
    player_name: "Mamadou NIANG",
    position: "Attacker",
    state: "first",
  });
  const player14 = await controllerPlayer.createPlayer(ligateam2.id, 3, {
    player_name: "Benoit COSTIL",
    position: "Goalkeeper",
    state: "first",
  });
  const player15 = await controllerPlayer.createPlayer(null, 5, {
    player_name: "Xavier JAFFRY",
    position: "Goalkeeper",
    state: "first",
  });
  const player16 = await controllerPlayer.createPlayer(null, null, {
    player_name: "Lilian JAFFRY",
    position: "Goalkeeper",
    state: "first",
  });
  // exemple de création sans state ce qui sera le cas de l'API
  const player17 = await controllerPlayer.createPlayer(null, 3, {
    player_name: "Pascal JAFFRY",
    position: "Goalkeeper",
  });

  const player18 = await controllerPlayer.createPlayer(null, 6, {
    player_name: "Yoann CABAYE",
    position: "Mildfielder",
  });

  const player19 = await controllerPlayer.createPlayer(null, 2, {
    player_name: "Marouane CHAMACK",
    position: "Attacker",
  });

  const player20 = await controllerPlayer.createPlayer(null, 1, {
    player_name: "Benoit PEDRETTI",
    position: "Mildfielder",
  });

  const player21 = await controllerPlayer.createPlayer(null, 13, {
    player_name: "Jean CASTENEDA",
    position: "Goalkeeper",
  });

  const player22 = await controllerPlayer.createPlayer(null, 17, {
    player_name: "Paulo DIBALA",
    position: "Attacker",
  });

  const player23 = await controllerPlayer.createPlayer(null, 16, {
    player_name: "Marquinhos",
    position: "Defender",
  });

  const player24 = await controllerPlayer.createPlayer(null, 3, {
    player_name: "Raphaël VARANE",
    position: "Defender",
  });

  const player25 = await controllerPlayer.createPlayer(null, 11, {
    player_name: "Ruud GULLIT",
    position: "Mildfielder",
  });

  const player26 = await controllerPlayer.createPlayer(null, 4, {
    player_name: "Marco REUS",
    position: "Mildfielder",
  });

  const player27 = await controllerPlayer.createPlayer(null, 13, {
    player_name: "Mario KEMPES",
    position: "Defender",
  });

  const player28 = await controllerPlayer.createPlayer(null, 8, {
    player_name: "Dominique BARATELLI",
    position: "Goalkeeper",
  });

  const player29 = await controllerPlayer.createPlayer(null, 15, {
    player_name: "Richard VIRENQUE",
    position: "Attacker",
  });

  const player30 = await controllerPlayer.createPlayer(null, 16, {
    player_name: "Donald TRUMP",
    position: "Defender",
  });

  const player31 = await controllerPlayer.createPlayer(null, 2, {
    player_name: "Janie LONGO",
    position: "Mildfielder",
  });

  const player32 = await controllerPlayer.createPlayer(null, 7, {
    player_name: "Emmanuel MACRON",
    position: "Defender",
  });

  const player33 = await controllerPlayer.createPlayer(null, 13, {
    player_name: "ZICO",
    position: "Milfielder",
  });

  const player34 = await controllerPlayer.createPlayer(null, 14, {
    player_name: "CHOUPO MOTTING",
    position: "Attacker",
  });

  const player35 = await controllerPlayer.createPlayer(null, 8, {
    player_name: "Bertrand DEMANE",
    position: "Goalkeeper",
  });

  const player36 = await controllerPlayer.createPlayer(null, 6, {
    player_name: "Youri DJORKAEF",
    position: "Mildfielder",
  });

*/


// tuto ======================================================================
/*
  const player1 = await controllerPlayer.create( {
    player_idapif: 1,
    player_name: "Player#1 Name",
    position: "Player#1 Position",
    state: "Player#1 State",
  });

  const player2 = await controllerPlayer.create( {
    player_idapif: 2,
    player_name: "Player#2 Name",
    position: "Player#2 Position",
    state: "Player#2 State",
  });

  const player3 = await controllerPlayer.create( {
    player_idapif: 3,
    player_name: "Player#3 Name",
    position: "Player#3 Position",
    state: "Player#3 State",
  });

  const player4 = await controllerPlayer.create( {
    player_idapif: 4,
    player_name: "Player#4 Name",
    position: "Player#4 Position",
    state: "Player#4 State",
  });

//  const round1 = await controllerRound.create({
//    round: "Round#1",
//  });


  const round2 = await controllerRound.create({
    round: "Round#2",
  });
  const round3 = await controllerRound.create({
    round: "Round#3",
  });


  await controllerRound.addPlayer(round1.id, player1.id);
  await controllerRound.addPlayer(round1.id, player2.id);
  await controllerRound.addPlayer(round1.id, player3.id);
  await controllerRound.addPlayer(round2.id, player3.id);
  await controllerRound.addPlayer(round2.id, player4.id);
  await controllerRound.addPlayer(round2.id, player1.id);

*/
// ==========================================================================

};


// keep the database if it already exists
//db.sequelize.sync();

// drop the table if it already exists
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  run();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/liga.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
