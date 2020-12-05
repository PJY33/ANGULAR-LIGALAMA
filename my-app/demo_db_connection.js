var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "liga",
  password: "PJY_ligalama33+"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});