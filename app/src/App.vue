<template>
  <div id="app">
    <nav>
      <ul class="nav">
        <li v-if="getUserIsLogged()"><button v-on:click="logout">Logout</button></li>
        <li v-else><router-link v-bind:to="'/login'">Login</router-link></li>
        <li v-if="getUserIsLogged()"><router-link v-bind:to="'/'">Tasks</router-link></li>
        <li v-if="getUserIsLogged()"><router-link v-bind:to="'/folders'">Folders</router-link></li>
      </ul>
    </nav>
    <!-- the router outlet, where all matched components would ber viewed -->
    <router-view :key="$route.fullPath"></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    getUserIsLogged () {
      return this.$store.getters.getToken != null;
    },
    logout() {
      this.$store.commit('logout');
      window.location.replace('/');
    }
  }
}
</script>
<!-- styling for the component -->
<style>
ul {
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.nav {
  display: flex;
  justify-content: end;
}
.nav li {
  padding-right: 50px;
}
nav {
  border-bottom: 1px solid grey;
  margin-bottom: 30px;
}

.container {
  display: flex;
  justify-content: center;
}
.task_container {
  border: 2px solid grey;
  padding: 10px;
  min-width: 400px;
}

ul {
  padding: 0;
}

.item {
  display: flex;
  justify-content: space-between;
}

.buttons {
  margin-right: 50px;
}

.add_task {
  margin-top: 40px;
}

h3, .add_task {
  text-align: initial;
}


@media only screen and (max-width: 500px) {
  .nav {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .task_container {
    min-width: 0;
  }

  h3, .add_task {
    text-align: center;
  }

  .item {
    margin-top: 10px;
    display: block;
    border: 1px solid grey;
  }

  .buttons {
    margin-top: 10px;
    margin-right: 0;
  }
}

h5 {
  margin: 10px;
}
</style>
