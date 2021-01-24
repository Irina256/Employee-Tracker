const mysql = require("mysql");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4A0sa9kx!",
  database: "employees",
});
db.connect((err) => {
  if (err) throw err;
  console.log("Connected!");
});
module.exports = db;
