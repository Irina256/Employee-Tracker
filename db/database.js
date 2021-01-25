const inquirer = require("inquirer");

const mysql = require("mysql2");
// create the db

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "4A0sa9kx!",
  database: "employees",
});
const { promptUser } = require("../server");
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
    results.forEach((data) => {
      depParams.push(data.name);
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
const updateEmployee = () => {
  db.query(`SELECT * FROM role`, function (err, results, fields) {
    if (err) {
      console.log(err.message);
      return;
    }

    let roleParams = [];

    // for each data in the results array, push the name of the roles to the roles array
    results.forEach((data) => {
      roleParams.push(data.title);
    });
    db.query(
      `SELECT first_name, last_name FROM employee`,
      function (err, results, fields) {
        if (err) {
          console.log(err.message);
        }

        let nameParams = [];
        results.forEach((data) => {
          nameParams.push(data.first_name);
          nameParams.push(data.last_name);
        });
        let combinednameParams = [];
        for (let i = 0; i < nameParams.length; i += 2) {
          if (!nameParams[i + 1]) break;
          combinednameParams.push(`${nameParams[i]} ${nameParams[i + 1]}`);
        }
        inquirer
          .prompt([
            {
              type: "list",
              name: "name",
              message: "Select an employee you would like to update",
              choices: combinednameParams,
            },
            {
              type: "list",
              name: "role",
              message: "Select a role:",
              choices: roleParams,
            },
          ])
          .then((data) => {
            let role_id;
            for (let i = 0; i < roleParams.length; i++) {
              if (data.role === roleParams[i]) {
                role_id = i + 1;
              }
            }
            let selectednameParams = data.name.split(" ");
            let last_name = selectednameParams.pop();
            let first_name = selectednameParams[0];

            db.query(
              `UPDATE employee 
  SET role_id = ?
WHERE first_name = ? AND last_name = ?`,
              [role_id, first_name, last_name],
              function (err, results, fields) {
                if (err) {
                  console.log(err.message);
                  return;
                }
                console.log("Employee updated!");
                promptUser();
              }
            );
          });
      }
    );
  });
};

module.exports = {
  viewAllDepartments,
  viewAllEmployees,
  viewAllRoles,
  addDepartment,
  addEmployee,
  addRole,
  updateEmployee,
};
