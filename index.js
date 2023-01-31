const inquirer= require('inquirer')
const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Nala1007',
  database: 'db_employees'
})

connection.connect();

connection.query = util.promisify(connection.query);


function menu () {
    inquirer 
    .prompt (menuQs)
    .then (answers => {
        if (answers.menu === "View All Departments") {
            viewDepartments()
        } 
        if (answers.menu === "View All Roles") {
            viewAllRoles()
        } 
        if (answers.menu === "View All Employees") {
            viewAllEmployees()
        } 
        if (answers.menu === "Add a Department") {
            addADepartment()
        } 
        if (answers.menu === "Add a Role") {
            addARole()
        } 
        if (answers.menu === "Add an Employee") {
            addAEmployee()
        } 
        if (answers.menu === "Update Employee Role") {
            updateAnEmployee()
        } 
       
        if (answers.menu === "Exit" ){
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
function viewDepartments () {
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
    inquirer.prompt([
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
    inquirer.prompt([
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
    inquirer.prompt([
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
    inquirer.prompt([
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

menu();