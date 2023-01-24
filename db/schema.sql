DROP DATABASE if exist db_employees;
CREATE DATABASE db_employees;
USE db_employees;

-- depart with id & name 

CREATE TABLE department(
    id int auto_increment primary key,
    name VARCHAR(30) 
);

-- role with id & title& salary & department_id
CREATE TABLE role(
    id int auto_increment primary key,
    title VARCHAR(30),
    salary DECIMAL,
    department_id int
);
-- employee with first, last, role, manager ( _id) 
CREATE TABLE employee(
    id int auto_increment primary key,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id int,
    manager_id int
);