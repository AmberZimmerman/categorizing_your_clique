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



// Function that prints data as a table in console

function printTable(data) {
  console.table(data);
}


// GIVEN a command-line application that accepts user input
// Return a promise everytime.

function commandMenu(questions) {
  return inquirer.prompt(questions);
}



//  This function gathers all mysql table department names

function getAllDepartments() {
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM department", function (err, allDept) {

          const allDeptNames = [];
          for (let i = 0; i < allDept.length; i++) {
            const singleDept = allDept[i];
            allDeptNames.push(singleDept.dept_name);
          }

    resolve(allDeptNames);
    });
  });
}



//  This function gathers all mysql table employee names

function getAllEmployees() {
  return new Promise(function (resolve, reject) {
    db.query("SELECT first_name, last_name FROM employee", function (err, names) {
      
        const allEmployeeNames = [];
        for (let i = 0; i < names.length; i++) {
          const singleName = names[i];
          allEmployeeNames.push(`${singleName.first_name} ${singleName.last_name}`)
        }

    resolve(allEmployeeNames);
    });
  });
}



// This function gathers all mysql table employee names

function getAllRoles() {
  return new Promise(function (resolve, reject) {
    db.query("SELECT role_title FROM role", function (err, roles) {
      
        const allRoles = [];
        for (let i = 0; i < roles.length; i++) {
          const singleRole = roles[i];
          allRoles.push(`${singleRole.role_title}`)
        }

    resolve(allRoles);
    });
  });
}



// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// Uses the print table function I created on line 4

function viewAllDepartments() {
  return new Promise(function (resolve, reject) {
    db.query("SELECT id, dept_name FROM department", function (err, results) {
      printTable(results);
      resolve();
    });
  });
}



// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// Uses the print table function I created on line 4

function viewAllRoles() {
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM role INNER JOIN department ON role.id = department.id", function (err, results) {
      printTable(results);
      resolve();
    });
  });
}



// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// Still need department name and manager

function viewAllEmployees() {
  return new Promise(function (resolve, reject) {
    db.query("SELECT * FROM employee INNER JOIN role ON employee.id = role.id INNER JOIN department ON role.department_id=department.id", function (err, results) {
      if (err) {
        console.log("Err:", err);
      }
      printTable(results);
      resolve();
    });
  });
}



// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database

async function addDepartment() {
  const userResponse = await commandMenu([
    {
      type: "input",
      message: `What is the name of the department?`,
      name: "departmentName",
    },
  ]);
console.log(`Department Name: ${userResponse.departmentName}`);



  // Save the name into our MySQL Database

  return new Promise(function (resolve, reject) {
    db.query(
      `INSERT INTO department (dept_name) VALUES ("${userResponse.departmentName}")`,
      function (err, results) {
        if (err) {
          console.log("Err:", err);
        }
        resolve();

        console.log("Add Department Results:", results);
      }
    );
  });
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

async function addRole() {
  
  let deptData = await getAllDepartments();
  
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
        choices: deptData,
        name: "newRoleDepartment",
      }
    ]);

  return new Promise(function (resolve, reject) {
    db.query(`INSERT INTO role (role_title, salary) VALUES ("${addNewRole.newRole}", "${addNewRole.roleSalary}")`, 
    function (err, results) {
        
      if (err) {
        }
        resolve();
      }
     );
  });
}



// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database

async function addEmployee() {
    let allEmployees = await getAllEmployees();
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

  return new Promise(function (resolve, reject) {
    db.query(
      `INSERT INTO employee (first_name, last_name) VALUES ("${addNewEmployee.firstName}", "${addNewEmployee.lastName}")`,
      function (err, results) {
        if (err) {
          console.log("Err:", err);
        }
        resolve();

        console.log("Add Employee Results:", results);
      }
    );
  });
}




// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

async function updateRole() {
  let allEmployees = await getAllEmployees();
  let allRolesList = await getAllRoles();

  console.log("THIS IS allEmployees:", allEmployees);
  console.log("THIS IS allRolesList:", allRolesList);
    const updateEmployeeRole = await commandMenu([
      {
        type: "list",
        message: `Which employee's role would you like to update?`,
        choices: allEmployees,
        name: "employeeUpdate",
      },
      {
        type: "list",
        message: `Which role do you want to assign to the selected employee?`,
        choices: allRolesList,
        name: "roleUpdate",
      },
    
    ]);
  console.log('Update Response:', updateEmployeeRole);
}



// WHEN I start the application
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

  console.log("User Input:", startResponse.activity);

  // Based off user input, do something

    switch (startResponse.activity) {
      case "View all employees":
        await viewAllEmployees();
        break;
      case "Add employee":
        await addEmployee();
        break;
      case "Update Employee Role":
        await updateRole();
        break;
      case "View all roles":
        await viewAllRoles();
        break;
      case "Add Role":
        await addRole();
        break;
      case "View all Departments":
        await viewAllDepartments();
        break;
      case "Add department":
        await addDepartment();
        break;
    }

  // If user input DO equal finished, I DON'T want to START()
  // If user input does NOT equal finished, I DO want to START()

    if (startResponse.activity === "Finished") {
      console.log("All Done! Press control C");
      return;
    } else {
      start();
      console.log("begin again");
    }
}

start();

// Still need to connect new role with all the departments and display all the department options in add role


// Need to add role_title, dept_name, salary, and manager to view employee table

// Need to add a manager column to the employee table
