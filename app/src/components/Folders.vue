<template>
  <div class="container">
    <div class="task_container">
      <h3>Folders</h3>
      <ul>
        <li v-for="(folder, index) in folders">
          <div class="item">
            <div>
              <h5>- {{folder.name}}</h5>
            </div>
            <div class="buttons">
              <router-link v-bind:to="{name: 'folder_tasks', params: {id: folder.id}}">View items</router-link>
              <button class="btn btn-link" v-on:click="deleteFolder(index)">Remove</button>
            </div>
          </div>

        </li>
      </ul>
      <form class="add_task">
        <input id="name" type="text" name="name" placeholder="Folder name">
        <button type="button" v-on:click="insertFolder">Add</button>
      </form>
    </div>
  </div>
</template>

<script>
import store from "../store/store";

export default {
  name: "Folders",
  data () {
    return {
      folders: [],
      token: null
    }
  },
  methods: {
    getFolders () {
      fetch('/folders', {headers: {"token":  this.token}})
        .then(res => res.json())
        .then(json => this.folders = json);
    },
    insertFolder () {
      let name = document.getElementById("name").value;
      let json = {
        name: name
      };
      fetch('/folders', {
        method: 'POST',
        headers: { "Content-Type": "application/json", "token":  this.token },
        body: JSON.stringify(json)
      });
      this.getFolders();
      document.getElementById("name").value = "";
    },
    deleteFolder (index) {
      fetch(`/folders/${this.folders[index].id}`, {method:'delete', headers:{"token":  this.token}});
      this.folders.splice(index, 1);
    }

  },
  created() {
    this.token = store.getters.getToken;
    fetch('/folders', {headers: {"token":  this.token}})
      .then(res => res.json())
      .then(json => this.folders = json);
  }
}
</script>

<style scoped>

</style>
