<template>
  <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">
        <router-link :to="{name: 'home'}">Vue Mini Project</router-link>
      </h5>
    
    <nav class="my-2 my-md-0 mr-md-3">
      <router-link to="/product" class="p-2 text-dark">Product management</router-link>
      <router-link to="/user" class="p-2 text-dark">User management</router-link>
    </nav>
    <button @click="logout_process()" class="btn btn-outline-primary" routerlink="cart">{{ this.user.name }}</button>
  </div>
  <router-view/>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data(){
    return {
      email: "",
      password: ""
    }
  },
  computed: {
    ...mapGetters("auth", ["user"])
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    logout_process(){
      this.logout()
      this.$router.push("/")
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
