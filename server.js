const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
const Queries = require('./queries');

const PORT = process.env.PORT || 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'Mysqlpass@123',
    database: 'company_db'
  },
);

const mySqlQueries = new Queries(db);

function chooseOption() {
  inquirer
  .prompt([
    {
      type: 'list',
      name: 'option',
      message: "What would you like to do?",
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    },
  ])
  .then(function (selectedChoice) {
    switch (selectedChoice.option) {
      case 'View all departments':
        viewAllDeps();
        break;
      case 'View all roles':
        viewAllRoles();
        break;
      case 'View all employees':
        viewAllEmps();
        break;
      case 'Add a department':
        addDep();
        break;
      case 'Add a role':
        addRole();
        break;
    }
  })
};

function viewAllDeps() {
  mySqlQueries.viewAllDepartments();
  chooseOption();
}

function viewAllRoles() {
  mySqlQueries.viewAllRoles();
  chooseOption();
}

function viewAllEmps() {
  mySqlQueries.viewAllEmployees();
  chooseOption();
}

function addDep() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: "Enter department name",
    }
  ]).then(function (answer) {
    mySqlQueries.addDepartment(answer.departmentName);
    chooseOption();
  })
}

function addRole() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'roleName',
      message: "Enter role name",
    },
    {
      type: 'input',
      name: 'salary',
      message: "Enter salary",
    },
    {
      type: 'list',
      name: 'department',
      message: "Enter department",
      choices: mySqlQueries.getAllDepartments()
    }
  ]).then(function (answer) {
    mySqlQueries.addRole(answer.roleName, answer.salary, answer.department);
    chooseOption();
  })
}

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
});

chooseOption();