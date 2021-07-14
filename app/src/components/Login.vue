<template>
  <div class="container">
    <div class="task_container">
      <h3>Login</h3>
      <form class="add_task">
        <input id="email" type="text" name="email" placeholder="Email">
        <input id="password" type="password" name="password" placeholder="Password">
        <button type="button" v-on:click="login">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tasks",
  methods: {
    login () {
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      if (email.length  < 1 || password.length < 1) {
        alert("Complete the fields.");
        return;
      }
      fetch('/login', {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({email: email, password:password})
      }).then(res => res.json())
        .then(json => {
          if (json.token) {
            this.$store.commit('setToken',json.token);
            window.location.replace('/');
          }
          else
            alert(json.message);
        });
    }
  }
}
</script>

<style scoped>

</style>
