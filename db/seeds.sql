INSERT INTO department (name)
VALUES ("Sales"),
       ("Marketing");

INSERT INTO role (title, salary, department_id)
VALUES ("manager", 1323.43, 1),
       ("assistant manager", 1000.4, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("vivek", "garg", 2, 2),
       ("pooja", "agarwal", 1, 1);
       
