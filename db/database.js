const mysql = require("mysql2");
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

// View department
// const viewDep = () => {
//   connection.query(`SELECT * FROM department`, function (err, results, fields) {
//     if (err) {
//       console.log(err.message);
//       return;
//     }

//     console.table(results);
//     promptUser();
//   });
// };
async function viewAllDepartments() {
  // SELECT * from department;

  let query = "SELECT * FROM department";
  const rows = await db.query(query);
  console.table(rows);
}

module.exports = { db, viewAllDepartments };
