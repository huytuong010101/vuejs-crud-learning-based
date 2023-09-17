<template>
    <div class="product-form">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3 class="display-5">Product Infomation</h3>
            <router-link to="/product">Back</router-link>
        </div>
        
        <div class="container">
            <form @submit.prevent="save()">
                <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Product name</label>
                <div class="col-sm-9">
                    <input @blur="validate()" type="text" class="form-control" v-model="product.name" v-bind:class="{'is-invalid': errors.name}"/>
                    <!-- <div class="invalid-feedback" v-if="errors.name">{{errors.name}}</div> -->
                </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Product price</label>
                    <div class="col-sm-9">
                        <input @blur="validate()" type="number" class="form-control" v-model="product.price" v-bind:class="{'is-invalid': errors.price}"/>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Product description</label>
                    <div class="col-sm-9">
                        <textarea @blur="validate()" class="form-control" rows="3" v-model="product.description" v-bind:class="{'is-invalid': errors.description}"></textarea>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label"></label>
                    <div class="col-sm-9">
                        <button type="submit" class="btn btn-primary">Save</button> &nbsp;
                        <button type="reset" class="btn btn-danger">Cancel</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import { mapGetters, mapActions, mapMutations } from 'vuex';
export default {
    name: "product-form",
    computed: {
        ...mapGetters("product", ["product"])
    },
    data() {
        return {
            errors: {
                name: "",
                price: "",
                description: "",
            },
        }
    },
    async created(){
        if (this.$route.params.id){
            this.loadProduct(this.$route.params.id);
        } else {
            this.setProduct({})
        }
    },
    methods: {
        ...mapActions("product", ["loadProduct", "updateProduct", "createProduct"]),
        ...mapMutations("product", ["setProduct"]),
        validate(){
            let isValid = true;
            if (!this.product.name){
                this.errors.name = "Name is required!"
                isValid = false
            } else {
                this.errors.name = ""
            }
            if (!this.product.price){
                this.errors.price = "price is required!"
                isValid = false
            } else {
                this.errors.price = ""
            }
            return isValid;
        },
        async save(){
            if (this.validate()){
                // Update
                let success = null
                if (this.product.id){
                    success = await this.updateProduct(this.product);
                } else {
                    // Create
                    success = await this.createProduct(this.product);
                }
                
                if (success){
                    this.$router.push({name: "product.list"})
                    return
                }
                alert("Some thing wrong")
            }
        },
    },
}
</script>