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

class Folder {
    constructor() {
        this.db = connection;
    }
    getFolders (callback) {
        this.db.query("SELECT * FROM folders", (error, rows) => {
            callback(error, rows);
        });
    }
    getFolderById (id, callback) {
        this.db.query("SELECT * FROM folders WHERE id = ?", id, (error, rows) => {
            callback(error, rows);
        });
    }
    insertFolder (name) {
        this.db.query("INSERT INTO folders(name) VALUES (?)", name);
    }
    deleteFolder (id) {
        this.db.query("DELETE FROM folders WHERE id = ?", id);
    }
}

module.exports = Folder;