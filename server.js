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
  console.log(`Connected to the company database.`)
);

const mySqlQueries = new Queries(db);

const chooseOption = () => {
  return inquirer
  .prompt([
    {
      type: 'list',
      name: 'option',
      message: "What would you like to do?",
      choices: ['View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role']
    },
  ])
  .then(function (selectedChoice) {
    console.log("choices obj " + selectedChoice.option);
    if (selectedChoice.option === 'View all departments') {
      console.log("in choice view all dep ");
      mySqlQueries.viewAllDepartments();
    } else if(selectedChoice.option === 'View all roles') {
      mySqlQueries.viewAllRoles();
    } else if(selectedChoice.option === 'View all employees') {
      mySqlQueries.viewAllEmployees();
    }
    return chooseOption();
  })
};

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
});
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

chooseOption()
.catch(err => {
  console.log(err);
});