<template>
  <div class="home" v-if="this.token">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Welcome to My Vue.js CRUD App</h1>
  </div>
  <form @submit.prevent="login_process()" v-else class="container text-left">
    <h3 class="text-center">Login here</h3>
    <div class="invalid-feedback d-block text-center">{{ this.message }}</div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input v-model="email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input v-model="password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
    </div>
    <button type="submit" class="btn btn-primary">Login</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  // created(){
  //   console.log(this.token)
  //   console.log(this.user)
  // },
  data(){
    return {
      email: "",
      password: "",
    }
  },
  computed: {
    ...mapGetters("auth", ["user", "token", "message"])
  },
  methods: {
    ...mapActions("auth", ["login", "logout"]),
    async login_process(){
      let success = await this.login({"email": this.email, "password": this.password})
    },
  }
}
</script>