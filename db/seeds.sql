INSERT INTO department (dept_name)
VALUES ("Sales"),
        ("Engineering"),
        ("Finance"),
        ("Legal");

INSERT INTO role (department_id, role_title, salary)
VALUES (1, "Sales Lead", 10000),
       (1, "Salesperson", 80000),
       (2, "Lead Engineer", 150000),
       (2, "Software Engineer", 120000),
       (3, "Account Manager", 160000),
       (3, "Accountant", 125000),
       (4, "Legal Team Lead", 250000),
       (4, "Lawyer", 190000);

-- need to add in manager id at some point
INSERT INTO employee (role_id, first_name, last_name, manager_id)
VALUES (1, "John", "Doe", 2),
        (2, "Mike", "Chan", 3),
        (3, "Ashley", "Rodriguez", 5),
        (4, "Kevin", "Tupik", 2),
        (5, "Kunal", "Singh", 1),
        (6, "Malia", "Brown", 7),
        (7, "Sarah", "Lourd", 5),
        (8, "Tom", "Allen", 5);