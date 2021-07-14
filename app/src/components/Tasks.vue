<template>
  <div class="container">
    <div class="task_container">
      <h3 v-if="folder_name"><router-link v-bind:to="'/folders'">Folders </router-link> > {{folder_name}}</h3>
      <h3 v-else>To-Do List</h3>
      <ul>
        <li v-for="(task, index) in tasks">
          <div class="item">
            <div>
              <input type="checkbox" v-bind:checked="task.done" v-on:change="updateStatus(index)">
              {{task.name}}
            </div>
            <div class="buttons">
              <router-link v-bind:to="{name: 'tasks_edit', params: {id: task.id}}">Edit</router-link>
              <button v-on:click="deleteTask(index)">Remove</button>
            </div>
          </div>

        </li>
      </ul>
      <form class="add_task">
        <input id="name" type="text" name="name" placeholder="Task name">
        <button type="button" v-on:click="insertTask">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "../store/store";
export default {
  name: "Tasks",
  data () {
    return {
      tasks: [],
      id_folder: this.$route.params.id,
      folder_name: null,
      token: null
    }
  },
  methods: {
    getTasks () {
      let url = 'tasks';
      if (this.id_folder)
        url = 'folders/'+this.id_folder;
      fetch(`/${url}`, {headers: {"token":  this.token}})
        .then(res => res.json())
        .then(json => {
          this.tasks = this.id_folder ? json.tasks : json;
          if (this.id_folder)
            this.folder_name = json.name;
        });
    },
    insertTask () {
      let name = document.getElementById("name").value;
      let json = {
        name: name,
        id_folder: this.id_folder
      };
      fetch('/tasks', {
        method: 'POST',
        headers: { "Content-Type": "application/json", "token":  this.token },
        body: JSON.stringify(json)
      });
      this.getTasks();
      document.getElementById("name").value = ""
    },
    updateStatus (index) {
      fetch(`/tasks/status/${this.tasks[index].id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json", "token":  this.token},
        body: JSON.stringify({status:!this.tasks[index].done})
      });
    },
    deleteTask (index) {
      fetch(`/tasks/${this.tasks[index].id}`, {method:'delete', headers: {"token":  this.token}});
      this.tasks.splice(index, 1);
    }

  },
  created() {
    this.token = store.getters.getToken;
    let url = 'tasks';
    if (this.id_folder)
      url = 'folders/'+this.id_folder;
    fetch(`/${url}`, {headers: {"token":  this.token}})
    .then(res => res.json())
    .then(json => {
      this.tasks = this.id_folder ? json.tasks : json;
      if (this.id_folder)
        this.folder_name = json.name;
    });
  }
}
</script>

<style scoped>

</style>
