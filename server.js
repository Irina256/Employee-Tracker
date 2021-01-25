const inquirer = require("inquirer");

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
          case "Update an employee role": {
            updateEmployee();
            break;
          }
          case "Exit": {
            break;
          }
        }
      })
  );
}

module.exports = { promptUser };
const {
  viewAllDepartments,
  viewAllEmployees,
  viewAllRoles,
  addDepartment,
  addEmployee,
  addRole,
  updateEmployee,
} = require("./db/database");
promptUser();
