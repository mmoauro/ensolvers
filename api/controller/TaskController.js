const task_model = require("../model/Task");
class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.model = new task_model();
    }
    getAll () {
        this.res.set('id_user', 1);
        this.model.getTasks((error, tasks) => this.res.json(tasks));
    }
    getByFolder () {
        let folder_id = this.req.params.id;
        this.model.getTasksByFolder(folder_id, (error, tasks) => this.res.json(tasks));
    }
    getById () {
        let id = this.req.params.id;
        this.model.getTaskById(id, (error, task) => this.res.json(task[0]))
    }
    insertTask () {
        let name = this.req.body.name;
        let folder_id = this.req.body.id_folder ? this.req.body.id_folder : null;
        if (name.length > 0)
            this.model.insertTask(name, folder_id);
        this.res.json({});
    }
    updateTask () {
        let name = this.req.body.name;
        let description = this.req.body.description;
        let id = this.req.body.id;
        this.model.updateTask(name, description, id);
        this.res.json({});
    }
    deleteTask () {
        let id = this.req.params.id;
        this.model.deleteTask(id);
        this.res.json({});
    }
    updateStatus () {
        let id = this.req.params.id;
        let status = this.req.body.status;
        this.model.updateStatus(status, id);
        this.res.json({});
    }
}
module.exports = TaskController;