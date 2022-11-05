class Queries {
    constructor(db) {
        this.db = db;
    }

    viewAllDepartments() {
      console.log("inside viewAllDep");
        const sql = `SELECT * FROM department;`;
        this.db.query(sql, (err, res) => {
            if (err) {
              throw err;
            }
            console.table(res);
          });
    }

    viewAllRoles() {
      const sql = `SELECT * FROM role;`;
      this.db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          console.table(res);
        });
    }

    viewAllEmployees() {
      const sql = `SELECT * FROM employee;`;
      this.db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
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
        });
    }

    addRole(title, salary, department) {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES ($title, $salary, $department_id);`;
      this.db.query(sql, (err, res) => {
        if (err) {
          throw err;
        }
      });
    }

    addEmployee(first_name, last_name, role_id, manager_id) {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($first_name, $last_name, $role_id, $manager_id);`;
      this.db.query(sql, (err, res) => {
        if (err) {
          throw err;
        }
      });
    }

    updateEmployeeRole(employee_id, role_id) {
        const sql = `UPDATE employee SET role_id = $role_id WHERE id = $employee_id;`;
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
}

module.exports = Queries;