<template>
  <div class="product-list">
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
      <h2 class="display-4">Product Management</h2>
      <p><router-link to="/product/create">Add new</router-link></p>
    </div>
  
    <div class="container">
      <div class="card-deck mb-3 text-center">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product name</th>
              <th scope="col">Price</th>
              <th scope="col">Handle</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, index) in products">
              <th scope="row">{{index + 1}}</th>
              <td>{{product.name}}</td>
              <td>{{product.price}}</td>
              <td>
                <div v-if="this.token">
                  <router-link :to="{name: 'product.edit', params: {id: product.id}}">
                    <button class="btn btn-primary">Edit</button>
                  </router-link>&nbsp
                  <button class="btn btn-danger" @click="onDelete(product.id)">Delete</button>
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
      ...mapGetters("product", ["products"]),
      ...mapGetters("auth", ["token"]),
    },
    async created(){
      await this.loadAllProduct()
    },
    methods: {
      ...mapActions("product", ["loadAllProduct", "deleteProduct"]),
      async onDelete(productID){
        let result = await this.$swal.fire({
          title: 'Do you want to delete this product?',
          showDenyButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
        })
        if (result.isConfirmed){
          let success = await this.deleteProduct(productID)
          if (success){
            await this.loadAllProduct()
            this.$swal.fire('Deleted!', '', 'success')
          } else {
            this.$swal.fire('Can not delete delete!', '', 'info')
          }
          
        }
      }
    }
  }
</script>