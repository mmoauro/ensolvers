const mysql = require("mysql");
let env = process.env.NODE_ENV || 'development';
const config = require('../config')[env];
const connection = mysql.createPool({
    host     : config.database.host,
    user     : config.database.user,
    password : config.database.password,
    database : config.database.db
});
//connection.connect();

class Task {
    constructor() {
        this.db = connection;
    }
    getUserByEmail (email, callback) {
        this.db.query("SELECT * FROM users WHERE email = ?", email, (error, rows) => {
            callback(error, rows);
        });
    }
}

module.exports = Task;