USE employees;

INSERT into department (name) VALUES ("Accounting");
INSERT into department (name) VALUES ("IT");
INSERT into department (name) VALUES ("IS");
INSERT into department (name) VALUES ("HR");

INSERT into role (title, salary, department_id) VALUES ("Manager", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("Chief Accountant (Manager)", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("IT Manager", 150000, 2);
INSERT into role (title, salary, department_id) VALUES ("HR Manager", 90000, 4);
INSERT into role (title, salary, department_id) VALUES ("Accountant", 75000, 1);
INSERT into role (title, salary, department_id) VALUES ("IT Administrator", 900000, 2);
INSERT into role (title, salary, department_id) VALUES ("Developer", 100000, 3);
INSERT into role (title, salary, department_id) VALUES ("QA", 75000, 3);
INSERT into role (title, salary, department_id) VALUES ("HR Administrator", 70000, 4);

INSERT into employee (first_name, last_name, role_id, manager_id,  manager_c) VALUES ("Dave", "Claren", 1, NULL, false);
INSERT into employee (first_name, last_name, role_id, manager_id, manager_c) VALUES ("Pam", "Mira", 2, NULL, false);
INSERT into employee (first_name, last_name, role_id, manager_id,  manager_c) VALUES ("Scott", "Claus", 3, NULL, false);
INSERT into employee (first_name, last_name, role_id, manager_id,  manager_c) VALUES ("Dean", "Laren", 4, NULL, false);


INSERT into employee (first_name, last_name, role_id, manager_id, manager_c) VALUES ("Bob", "McKey", 5, 2, true);
INSERT into employee (first_name, last_name, role_id, manager_id,  manager_c) VALUES ("John", "Li", 5, 2, true);

INSERT into employee (first_name, last_name, role_id, manager_id,  manager_c) VALUES ("Kris", "Anderson", 6, 3, true);
INSERT into employee (first_name, last_name, role_id, manager_id,  manager_c) VALUES ("Lili", "Ken", 6, 3, true);


INSERT into employee (first_name, last_name, role_id, manager_id,  manager_c) VALUES ("Raul", "McKey", 7, 1, true);
INSERT into employee (first_name, last_name, role_id, manager_id,  manager_c) VALUES ("Mike", "Anderson", 8, 1, true);


INSERT into employee (first_name, last_name, role_id, manager_id,  manager_c) VALUES ("Mike", "Lenzie", 9, 4, true);

INSERT INTO manager (first_name, last_name)VALUES ("Dave", "Claren");
INSERT INTO manager (first_name, last_name)VALUES ("Pam", "Mira");
 INSERT INTO manager (first_name, last_name)VALUES ("Scott", "Claus");
 INSERT INTO manager (first_name, last_name)VALUES ("Dean", "Laren");
