const inquirer = require("inquirer");
// const { viewAllDepartments } = require("./db/database");

// get the client
const mysql = require("mysql2");
// create the db

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

// Add a new employee

const addEmployee = () => {
  db.query(`SELECT * FROM role`, function (err, results, fields) {
    if (err) {
      console.log(err.message);
      return;
    }

    let roleParams = [];

    results.forEach((data) => {
      roleParams.push(data.title);
    });
    db.query(`SELECT * FROM manager`, function (err, results, fields) {
      if (err) {
        console.log(err.message);
        return;
      }

      let manParams = [];

      results.forEach((data) => {
        manParams.push(data.first_name);
      });

      inquirer
        .prompt([
          {
            type: "text",
            name: "first_name",
            message: "What is you employees first name?",
          },
          {
            type: "text",
            name: "last_name",
            message: "What is your employees last name?",
          },
          {
            type: "list",
            name: "role",
            message: "What will you employees role be?",
            // use the names from the roles array to get the roles, this will allow us to add new roles in the future
            choices: roleParams,
          },
          {
            type: "confirm",
            name: "confirm",
            message: "Is it a manager position?",
          },
          {
            type: "list",
            name: "man_select",
            message: "Who will be the manager?",
            when: ({ confirm }) => {
              if (!confirm) {
                return true;
              } else {
                return false;
              }
            },
            choices: manParams,
          },
        ])
        .then((data) => {
          let role_id;
          for (i = 0; i < roleParams.length; i++) {
            if (data.role === roleParams[i]) {
              role_id = i + 1;
            }
          }

          let manager_c;
          if (data.confirm === true) {
            manager_c = true;
          } else {
            manager_c = false;
          }

          let manager_id;

          if (!data.man_select) {
            manager_id = null;
          } else {
            for (i = 0; i < manParams.length; i++) {
              if (data.man_select === manParams[i]) {
                manager_id = i + 1;
              }
            }
          }
          db.query(
            `INSERT INTO employee (first_name, last_name, role_id, manager_id, manager_c)
                                  VALUES (?, ?, ?, ?, ?)`,
            [data.first_name, data.last_name, role_id, manager_id, manager_c],
            function (err, results, fields) {
              if (err) {
                console.log(err.message);
                return;
              }
              console.log("Employee succesfully added!");
              promptUser();
            }
          );
        });
    });
  });
};
const addRole = () => {
  db.query(`SELECT * FROM department`, function (err, results, fields) {
    if (err) {
      console.log(err);
      return;
    }

    let depParams = [];
    results.forEach((item) => {
      depParams.push(item.name);
    });

    inquirer
      .prompt([
        {
          type: "text",
          name: "title",
          message: "What is a role title you would like to add: ",
        },
        {
          type: "number",
          name: "salary",
          message: "Waht is the salary?",
        },
        {
          type: "list",
          name: "department",
          message: "Select the department: ",
          choices: depParams,
        },
      ])
      .then((data) => {
        let department_id;

        for (let i = 0; i < depParams.length; i++) {
          if (depParams[i] === data.department) {
            department_id = i + 1;
          }
        }

        db.query(
          `INSERT INTO role (title, salary, department_id)
                          VALUES(?,?,?)`,
          [data.title, data.salary, department_id],
          function (err, results, fields) {
            if (err) {
              console.log(err.message);
              return;
            }

            console.log("Role added!");
            promptUser();
          }
        );
      });
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
          case "Add an employee": {
            addEmployee();
            break;
          }
          case "Add a role": {
            addRole();
            break;
          }
        }
      })
  );
}

promptUser();
// module.exports = { promptUser };
