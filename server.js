const mysql = require('mysql2');
const inquirer = require('inquirer');
const cTable = require('console.table');

// connect to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Inspiration21!',
        database: 'company_db',
    },
    console.log('Connected to the company_db database.')
)

// First question that asks what user wants to do
const start = () => [
        {
            type: 'list',
            message: 'What would you like to do?',
            choices: ['View all employees', 'Add employee', 'Update Employee Role', 'View all roles', 'Add Role',  'View all Departments', 'Add department'],
            name: 'activity'
        }
    ];

async function start() {
    let choice = await inquirer.prompt(start)
    console.log("what the user wants to do")
    console.log(choice);

    resolveChoice(choice.activity)
}

function resolveChoice(x) {
    switch (x) {
        case 'View all employees':
        // Show sql table of all employees
        break;
        
        case 'Add employee':
        // Prompt asking four questions "first name", "last name", "what is employee role- !!list!!, who is the employees manager- !!list!!"
        break;

        case 'Update Employee Role':
        // Prompt, first question asks for which employee !!list!!, next question "which role do you want to assign" - !!list of roles!!
        break;

        case 'View all roles':
        // Show sql table of all roles
        break;

        case 'Add Role':
        // Prompt 3 questions, 1st question "What is the name of the role" - user typed in answer, "What is the salary - user entered salary", "Which department does the role blong to" - !!!list of departments!!
        break;

        case 'View all Departments':
        // Show sql table of all departments
        break;

        case 'Add department':
        // Prompt ask question "Waht is the name of the department" - user types answer that adds to department table
        
    }
};




