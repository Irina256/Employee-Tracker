
DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

CREATE TABLE department (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  name VARCHAR(30) NOT NULL);
  
  CREATE TABLE role (
  id INTEGER NOT NULL auto_increment PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER,
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE cascade
);
  CREATE TABLE manager (
    id INTEGER auto_increment PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL);

 CREATE TABLE employee (
  id INTEGER  auto_increment PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL ,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
   manager_c BOOLEAN,
      CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES role(id) ON DELETE SET NULL,
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE);
  

  
  

