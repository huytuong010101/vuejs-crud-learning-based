<template>
  <div class="product-list">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h2 class="display-4">User Management</h2>
      <p><router-link to="/user/create">Add new</router-link></p>
    </div>
  
    <div class="container">
      <div class="card-deck mb-3 text-center">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users">
              <th scope="row">{{index + 1}}</th>
              <td>{{user.email}}</td>
              <td>{{user.name}}</td>
              <td>
                <div v-if="this.token">
                  <router-link :to="{name: 'user.edit', params: {id: user.id}}">
                    <button class="btn btn-info" >Edit</button>
                  </router-link>&nbsp
                  <button class="btn btn-danger" @click="onDelete(user.id)">Delete</button>
                </div>
                <div v-else class="invalid-feedback d-block">
                  <router-link :to="{name: 'home'}">Login to edit</router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState, mapActions, mapGetters} from "vuex"
  export default {
    computed: {
      ...mapGetters("user", ["users"]),
      ...mapGetters("auth", ["token"]),
    },
    async created(){
      await this.loadAllUser()
    },
    methods: {
      ...mapActions("user", ["loadAllUser", "deleteUser"]),
      async onDelete(userID){
        let result = await this.$swal.fire({
          title: 'Do you want to delete this user?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
        })
        if (result.isConfirmed){
          let success = await this.deleteUser(userID)
          if (success){
            await this.loadAllUser()
            this.$swal.fire('Deleted!', '', 'success')
          } else {
            this.$swal.fire('Can not delete user!', '', 'info')
          }
          
        }
      }
    }
  }
</script>