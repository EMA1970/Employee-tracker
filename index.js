const inquier = require("inquirer")
const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootroot',
  database: 'employees'
})

connection.connect();

connection.query = util.promisify(connection.query);


function menu () {
    inquirer 
    .prompt (menuQs)
    .then (answer => {
        if (answer.menu === "View All Departments") {
            viewDepartment()
        } 
        if (answer.menu === "View All Roles") {
            viewAllRoles()
        } 
        if (answer.menu === "View All Employees") {
            viewAllEmployees()
        } 
        if (answer.menu === "Add a Department") {
            addADepartment()
        } 
        if (answer.menu === "Add a Role") {
            addARole()
        } 
        if (answer.menu === "Add an Employee") {
            addAEmployee()
        } 
        if (answer.menu === "Update Employee Role") {
            updateAnEmployee()
        } 
       
        if (answer.menu === "Exit" ){
            process.exit()
        }

     })
}

const menuQs = [
    {
        type: "list",
        name: "menu",
        message: " What would you like to do?",
        choices: [
            "View All Departments",
            "View All Roles",
            "View All Employees",
            "Add a Department",
            "Add a Role",
            "Add an Employee",
            "Update Employee Role",
            "Exit"
          ]
    }
]


// create function for view department 
function viewDepartment () {
    connection.query("select * from department")
    .then (rows => {
        console.log(rows)
        menu()
    })
}
function viewAllRoles () {
    connection.query("select * from role")
    .then (rows => {
        console.log(rows)
        menu()
    })
}
function viewAllEmployees () {
    connection.query("select * from employee")
    .then (rows => {
        console.log(rows)
        menu()
    })
}
function addADepartment () {
    inquier.prompt([
        {
            type: "input",
            name: "department_name",
            message: " What is the department name?",
        }
    ])
    .then (answers => {
        // ? is for security purposes, to input the square bracket into (?)
        connection.query("insert into department (name) values (?)",[answers.department_name] )
        .then (rows => {
            console.log(rows)
            menu()
        })
        
    })
}
function addARole () {
    inquier.prompt([
        {
            type: "input",
            name: "role_title",
            message: " What is the role' name?",
        },
        {
            type: "input",
            name: "role_salary",
            message: " What is the role's salary?",
        },
        {
            type: "input",
            name: "role_id",
            message: " What is the role's id?",
        },
    ])
    .then (answers => {
        // ? is for security purposes, to input the square bracket into (?)
        connection.query("insert into role (title,salary,department_id) values (?,?,?)",[answers.role_title,answers.role_salary,answers.role_id] )
        .then (rows => {
            console.log(rows)
            menu()
        })
        
    })
}
function addAEmployee () {
    inquier.prompt([
        {
            type: "input",
            name: "first_name",
            message: " What is the employee's first name?",
        },
        {
            type: "input",
            name: "last_name",
            message: " What is the employee's last name?",
        },
        {
            type: "input",
            name: "role_id",
            message: " What is the employee's role id ?",
        },
        {
            type: "input",
            name: "manager_id",
            message: " What is the employee's manager's ID ?",
        },
    ])
    .then (answers => {
        // ? is for security purposes, to input the square bracket into (?)
        connection.query("insert into employee (first_name, last_name, role_id, manager_id) values (?,?,?,?)",[answers.first_name, answers.last_name, answers.role_id, answers.manager_id] )
        .then (rows => {
            console.log(rows)
            menu()
        })
        
    })
}
function updateAnEmployee () {
    inquier.prompt([
        {
            type: "input",
            name: "employee_id",
            message: " What is the employee's id?",
        },
        {
            type: "input",
            name: "role_id",
            message: " What is the employee's role_id?",
        },
    ])
    .then (answers => {
        // ? is for security purposes, to input the square bracket into (?)
        connection.query("update employee set role_id=? where id=?",[answers.role_id, answers.employee_id] )
        .then (rows => {
            console.log(rows)
            menu()
        })
        
    })
}