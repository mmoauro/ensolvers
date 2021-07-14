<template>
  <div class="container">
    <div class="task_container">
      <h3>Editing Task "{{task.name}}"</h3>
      <form class="edit_task">
        <input type="text" v-bind:value="task.name" placeholder="Task name" id="name">
        <div class="buttons">
          <button type="button" v-on:click="updateTask">Save</button>
          <router-link v-bind:to="'/'"><button type="button">Cancel</button></router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import store from "../store/store";

export default {
  name: "EditTask",
  data () {
    return {
      id_task: this.$route.params.id,
      task: {},
      token: null
    }
  },
  methods: {
    updateTask () {
      fetch(`/tasks/${this.id_task}`, {
        method:'put',
        headers: { "Content-Type": "application/json", "token":  this.token },
        body: JSON.stringify({name: document.getElementById("name").value, id:this.id_task})
      });
      this.$router.back();
    }
  },
  created() {
    this.token = store.getters.getToken;
    fetch(`/tasks/${this.id_task}`, {headers: {"token":  this.token}})
    .then(res => res.json())
    .then(json => this.task = json);
  }
}
</script>

<style scoped>

input {
  text-align: center;
}

</style>
