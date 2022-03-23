const inquirer = require("inquirer");

// I WANT to be able to view and manage the departments, roles, and employees in my company
function printTable(data) {
  console.table(data);
}
// GIVEN a command-line application that accepts user input
// Return a promise everytime.
function commandMenu(questions) {
  return inquirer.prompt(questions);
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// Uses the print table function I created on line 4
function viewAllDepartments() {
    printTable('viewAllDepartments')
}

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// Uses the print table function I created on line 4
function viewAllRoles() {
    printTable('view all roles')
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewAllEmployees() {
    printTable('view all employees')
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
async function addDepartment() {
    const addNewDepartment = await commandMenu([
        {
          type: "input",
          message: `What is the name of the department?`,
          name: "newDepartment",
        },
      ]);
    console.log(addNewDepartment);
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
async function addRole(departments) {
     const addNewRole = await commandMenu([
        {
          type: "input",
          message: `What is the name of the role?`,
          name: "newRole",
        },
        {
          type: "input",
          message: `What is the role salary?`,
          name: "roleSalary",
        },
        {
          type: "list",
          message: `What department does the role belong to?`,
          choices: ["Sales", "Engineering", "Finance", "Legal"],
          name: "newRoleDepartment",
        },
      ]);
    console.log(addNewRole);
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
async function addEmployee(allEmployees) {
    const addNewEmployee = await commandMenu([
        {
            type: "input",
            message: `What is the team member's first name?`,
            name: "firstName",
          },
          {
            type: "input",
            message: `What is the team member's last name?`,
            name: "lastName",
          },
          {
            type: "list",
            message: `What is the employee role?`,
            choices: [
              "Sales Lead",
              "Salesperson",
              "Lead Engineer",
              "Software Engineer",
              "Account Manager",
              "Accountant",
              "Legal Team Lead",
              "Lawyer",
            ],
            name: "employeeRole",
          },
          {
            type: "list",
            message: `What is the team member's manager?`,
            choices: allEmployees,
            name: "manager",
          }
    ]);
    console.log(addNewEmployee);
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
async function updateRole(allEmployees, allRoles) {
    const updateEmployeeRole = await commandMenu([
        {
          type: "list",
          message: `Who is the employee?`,
          choices: allEmployees,
          name: "employeeUpdate",
        },
        {
          type: "list",
          message: `Which role do you want to assign?`,
          choices: allRoles,
          name: "roleUpdate",
        },
      ]);
    console.log(updateEmployeeRole);
}



// HEN I start the application
async function start() {
  const startResponse = await commandMenu([
    {
      type: "list",
      message: "What would you like to do?",
      choices: [
        "View all employees",
        "Add employee",
        "Update Employee Role",
        "View all roles",
        "Add Role",
        "View all Departments",
        "Add department",
        "Finished",
      ],
      name: "activity",
    },
  ]);

  // Based off user input, do something

  console.log(startResponse);
}

updateRole(["billybob", "john"], ["accountant", "busybee"]);
