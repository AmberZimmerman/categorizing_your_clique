const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "Inspiration21!",
      database: "company_db",
    },
    console.log("Connected to the company_db database.")
  );

// Database Functions
function saveToDB() {
    // Use Database Logic Here
    const viewEmploy = `SELECT * FROM employee`;

      db.query(viewEmploy, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.json({
          message: "showing all employees",
          data: rows,
        });
      });
}

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
    // Get Deparment Name from User
    // { departmentName: 'Engineering' }
    const userResponse = await commandMenu([
        {
          type: "input",
          message: `What is the name of the department?`,
          name: "departmentName",
        },
      ]);
      console.log(`Department Name: ${userResponse.departmentName}`)
    // Save the name into our MySQL Database
    saveToDB();
    
    // Next is to get all data for table and print to screen

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

saveToDB();
