const express = require('express');
const router = express.Router();
const UserController = require("../controller/UserController");

router.post('/login', (req, res) => {
    let controller = new UserController(req, res);
    controller.login();
});

module.exports = router;
