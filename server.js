const inquirer = require("inquirer");
// const { viewAllDepartments } = require("./db/database");

// get the client
const mysql = require("mysql2");
// create the connection

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4A0sa9kx!",
  database: "employees",
});

const viewAllDepartments = () => {
  // SELECT * from department;

  db.query(`SELECT * FROM department`, function (err, results, fields) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.table(results);
    promptUser();
  });
};

const viewAllEmployees = () => {
  // SELECT * from department;

  db.query(
    `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary AS salary, department.name AS department, manager.first_name AS manager
   
  FROM employee
  LEFT JOIN role
  ON employee.role_id = role.id
  LEFT JOIN department
  ON role.department_id = department.id
  LEFT JOIN manager
  ON employee.manager_id = manager.id;`,
    function (err, results, fields) {
      if (err) {
        console.log(err.message);
        return;
      }
      console.table(results);
      promptUser();
    }
  );
};

const viewAllRoles = () => {
  // SELECT * from department;

  db.query(`SELECT * FROM role`, function (err, results, fields) {
    if (err) {
      console.log(err.message);
      return;
    }
    console.table(results);
    promptUser();
  });
};

const addDepartment = () => {
  inquirer
    .prompt({
      type: "text",
      name: "department",
      message: "What department would you like to add?",
    })
    .then((answer) => {
      db.query(
        `INSERT INTO department (name)
              VALUES(?)`,
        [answer.department],
        function (err, results, fields) {
          if (err) {
            console.log(err.message);
            return;
          }

          console.log("Added department!");
          promptUser();
        }
      );
    });
};
// Inital Prompt - Main Menu
function promptUser() {
  return (
    inquirer

      // Prompt the user
      .prompt({
        type: "list",
        name: "action",
        message: "What would you like to do? (Select on of the following)",
        choices: [
          "View all departments",
          "View all employees",
          "View all roles",
          "Add a department",
          "Add an employee",
          "Add a role",
          "Update an employee role",
          "Exit",
        ],
      })
      .then((answer) => {
        switch (answer["action"]) {
          case "View all departments": {
            viewAllDepartments();
            break;
          }
          case "View all employees": {
            viewAllEmployees();
            break;
          }
          case "View all roles": {
            viewAllRoles();
            break;
          }
          case "Add a department": {
            addDepartment();
            break;
          }
        }
      })
  );
}

promptUser();
// module.exports = { promptUser };
