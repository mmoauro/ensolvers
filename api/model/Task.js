const mysql = require("mysql");
let env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const connection = mysql.createConnection({
    host     : config.database.host,
    user     : config.database.user,
    password : config.database.password,
    database : config.database.db
});
connection.connect();

class Task {
    constructor() {
        this.db = connection;
    }
    getTasks (callback) {
        this.db.query("SELECT * FROM tasks", (error, rows) => {
            callback(error, rows);
        });
    }
    getTasksByFolder (id, callback) {
        this.db.query("SELECT * FROM tasks WHERE id_folder = ?", id, (error, rows) => {
            callback(error, rows);
        });
    }
    getTaskById (id, callback) {
        this.db.query("SELECT * FROM tasks WHERE id = ?", id, (error, rows) => {
            callback(error, rows);
        });
    }
    insertTask (name, id_folder) {
        this.db.query("INSERT INTO tasks(name, done, id_folder) VALUES (?,?,?)", [name, false, id_folder]);
    }
    updateTask (name, description, id) {
        this.db.query("UPDATE tasks SET name = ? WHERE id = ?", [name, id]);
    }
    deleteTask (id) {
        this.db.query("DELETE FROM tasks WHERE id = ?", id);
    }
    updateStatus (status, id) {
        this.db.query("UPDATE tasks SET done = ? WHERE id = ?", [status, id]);
    }
}

module.exports = Task;