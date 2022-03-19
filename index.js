const mysql = require('mysql2');
const inquirer = require('inquirer');
// const cTable = require('console.table');

// connect to database
let db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Inspiration21!',
        database: 'company_db',
    },
    console.log('Connected to the company_db database.')
)

// First question that asks what user wants to do

    let start = () => { 
        const mainMenu = [
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Add employee', 'Update Employee Role', 'View all roles', 'Add Role',  'View all Departments', 'Add department', 'Finished'],
            name: 'activity'
        }
    ];
    return inquirer.prompt(mainMenu);
    };


// Second function that will take answer from main menu
    let userChoice = (activity) => {
    
        switch(activity) {
            case 'View all employees':
            // Show sql table of all employees
            console.log("view employee")
                break;
            
            case 'Add employee':
            // Prompt asking four questions "first name", "last name", "what is employee role- !!list!!, who is the employees manager- !!list!!"
            const addEmployee = [
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
                    choices: ["Sales Lead",
                    "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"],
                    name: "employeeRole",
                },
                {
                    type: "input",
                    message: `What is the team member's manager?`,
                    name: "manager",
                },
            ];
            return inquirer.prompt(...addEmployee);
    
            case 'Update Employee Role':
            // Prompt, first question asks for which employee !!list!!, next question "which role do you want to assign" - !!list of roles!!
            console.log("updating the employee role")
                break;
    
            case 'View all roles':
            // Show sql table of all roles
            console.log("viewing all roles")
                break;
    
            case 'Add Role':
            // Prompt 3 questions, 1st question "What is the name of the role" - user typed in answer, "What is the salary - user entered salary", "Which department does the role blong to" - !!!list of departments!!
            console.log("adding a role")
                break;
    
            case 'View all Departments':
            // Show sql table of all departments
            console.log("view all departments")
                break;
    
            case 'Add department':
            // Prompt ask question "Waht is the name of the department" - user types answer that adds to department table
            console.log("eventually have a table of employees")
                break;
    
            }
    
        };
    
    
    
    start()
    
    .then(async(mainMenuSelection) => {
    
       if (mainMenuSelection === "Finished") {
        return;
       }
    
       let nextSelectionPrompts = userChoice(mainMenuSelection.activity);
    
       while (mainMenuSelection.activity != "Finished") {
    
        let nextSelection = await userChoice(nextSelectionPrompts);
        
        // nextSelectionPrompts = userChoice(nextSelection.activity);
       }
        let askAgain = await start()
        console.log("we are going to start again");
    
    
    });