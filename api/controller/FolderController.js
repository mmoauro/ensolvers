const folder_controller = require("../model/Folder");
const TaskModel = require("../model/Task");

class FolderController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.model = new folder_controller();
    }
    getAll () {
        this.model.getFolders((error, folders) => this.res.json(folders));
    }
    insertFolder () {
        let name = this.req.body.name;
        if (name.length > 0)
            this.model.insertFolder(name);
        this.res.json({});
    }
    deleteFolder () {
        let id = this.req.params.id;
        this.model.deleteFolder(id);
        this.res.json({});
    }
    getById () {
        let id = this.req.params.id;
        this.model.getFolderById(id, (error, rows) => {
            if (rows.length > 0) {
                let folder = rows[0];
                let task_model = new TaskModel();
                task_model.getTasksByFolder(id, (err, ro) => {
                    folder.tasks = ro;
                    this.res.json(folder);
                });
            }
            else
                this.res.status(404).json({message: 'There is no folder with that id.'});
        });
    }
}
module.exports = FolderController;