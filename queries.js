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
        const sql = `INSERT INTO department (name) VALUES ($departmentName);`;
        this.db.query(sql, (err, res) => {
          if (err) {
            throw err;
          }
          console.log(res);
        });
    }

    addRole(title, salary, department_id) {
      const sql = `INSERT INTO role (title, salary, department_id) VALUES ($title, $salary, $department_id);`;
      this.db.query(sql, (err, res) => {
        if (err) {
          throw err;
        }
        console.log(res);
      });
    }

    addEmployee(first_name, last_name, role_id, manager_id) {
      const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($first_name, $last_name, $role_id, $manager_id);`;
      this.db.query(sql, (err, res) => {
        if (err) {
          throw err;
        }
        console.log(res);
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
}

module.exports = Queries;