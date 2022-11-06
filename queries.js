class Queries {
    constructor(db) {
        this.db = db;
    }

    viewAllDepartments() {
        const sql = `SELECT * FROM department;`;
        this.db.query(sql, (err, res) => {
            if (err) {
              throw err;
            }
            console.log("");
            console.table(res);
          });
    }

    viewAllRoles() {
      const sql = `SELECT role.id, role.title, role.salary, department.name FROM role INNER JOIN department on role.department_id = department.id;`;
      this.db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          console.log("");
          console.table(res);
        });
    }

    viewAllEmployees() {
      const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name as department, manager.first_name as manger_first_name from employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id INNER JOIN employee as manager ON employee.manager_id = manager.id;`;
      this.db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          console.log("");
          console.table(res);
        });
    }

    addDepartment(departmentName) {
        console.log("department name = " + departmentName);
        const sql = `INSERT INTO department (name) VALUES ("${departmentName}");`;
        this.db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          console.log("");
        });
    }

    addRole(title, salary, department) {
      const sql = `INSERT INTO role (title, salary, department_id) SELECT "${title}", "${salary}", department.id from department WHERE name = "${department}";`;
      this.db.query(sql, (err, res) => {
        if (err) {
          throw err;
        }
        console.log("");
      });
    }

    addEmployee(first_name, last_name, role, manager_id) {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) SELECT "${first_name}", "${last_name}", role.id, "${manager_id}" from role WHERE title = "${role}";`;
      this.db.query(sql, (err, res) => {
        if (err) {
          throw err;
        }
        console.log("");
      });
    }

    updateEmployeeRole(employee, role_id) {
        const sql = `UPDATE employee SET role_id = ${role_id} WHERE first_name = "${employee}";`;
        this.db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          console.log(res);
        });
    }

    getAllRoles() {
      const sql = `SELECT * FROM role;`;
      var roleArr = [];
      this.db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          for (var i = 0; i < res.length; i++) {
            roleArr.push(res[i].title);
          }
        });
        return roleArr;
    }

    getAllDepartments() {
      const sql = `SELECT * FROM department;`;
      var depArr = [];
      this.db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          for (var i = 0; i < res.length; i++) {
            depArr.push(res[i].name);
          }
        });
        return depArr;
    }

    getAllManagerIds() {
      const sql = `SELECT * FROM employee;`;
      var managerArr = [];
      this.db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          for (var i = 0; i < res.length; i++) {
            managerArr.push(res[i].manager_id);
          }
        });
        return managerArr;
    }

    getAllEmployeesName() {
      const sql = `SELECT * FROM employee;`;
      var empArrs = [];
      this.db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          for (var i = 0; i < res.length; i++) {
            empArrs.push(res[i].first_name);
          }
        });
        return empArrs;
    }

    getRoleId(role_title) {
      const sql = `SELECT * FROM role WHERE title = "${role_title}";`;
      this.db.query(sql, (err, res) => {
            if (err) {
              throw err;
            }
            return res[0].id;
          });
    }
}

module.exports = Queries;