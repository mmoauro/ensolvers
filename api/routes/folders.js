const express = require('express');
const router = express.Router();
const FolderController = require("../controller/FolderController");
const auth = require("../middleware/auth");
router.route('/folders')
    .get(auth, (req, res) => {
        let controller = new FolderController(req, res);
        controller.getAll();
    })
    .post(auth, (req, res) => {
        let controller = new FolderController(req, res);
        controller.insertFolder();
    });

router.route('/folders/:id')
    .get(auth, (req, res) => {
        let controller = new FolderController(req, res);
        controller.getById();
    })
    .delete(auth, (req, res) => {
        let controller = new FolderController(req, res);
        controller.deleteFolder();
    })


module.exports = router;
