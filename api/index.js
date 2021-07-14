"use strict";
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const tasks = require('./routes/tasks');
const folders = require('./routes/folders');
const users = require('./routes/users');
const path = require("path");


app.use(cors({origin: '*'}));
app.use(express.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../app/dist')));
app.use(tasks);
app.use(folders);
app.use(users);

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../app/build/index.html'));
});

app.listen(process.env.PORT || 8000);