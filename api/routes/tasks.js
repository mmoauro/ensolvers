const express = require('express');
const router = express.Router();
const TaskController = require("../controller/TaskController");
const auth = require("../middleware/auth");
router.route('/tasks')
    .get(auth, (req, res) => {
        let controller = new TaskController(req, res);
        controller.getAll();
    })
    .post(auth, (req, res) => {
        let controller = new TaskController(req, res);
        controller.insertTask();
    });

router.route('/tasks/:id')
    .get(auth, (req, res) => {
        let controller = new TaskController(req, res);
        controller.getById();
    })
    .delete(auth,(req, res) => {
        let controller = new TaskController(req, res);
        controller.deleteTask();
    })
    .put(auth, (req, res) => {
        let controller = new TaskController(req, res);
        controller.updateTask();
    });

router.get('/folder/:id', auth, (req, res) => {
    let controller = new TaskController(req, res);
    controller.getByFolder();
});
router.put('/tasks/status/:id', auth,(req, res) => {
    let controller = new TaskController(req, res);
    controller.updateStatus();
})

module.exports = router;
