<template>
    <div class="user-form">
        <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
            <h3 class="display-5">User Infomation</h3>
            <router-link to="/user">Back</router-link>
        </div>
        
        <div class="container">
            <form @submit.prevent="save()">
                <div class="form-group row">
                <label for="inputPassword" class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-9">
                    <input v-model="user.email" @blur="validate()" type="email" class="form-control" v-bind:class="{'is-invalid': this.errors.email}"/>
                    <div class="invalid-feedback">{{errors.email}}</div>
                </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Fullname</label>
                    <div class="col-sm-9">
                        <input v-model="user.name" @blur="validate()" type="text" class="form-control" v-bind:class="{'is-invalid': this.errors.name}"/>
                        <div class="invalid-feedback">{{errors.name}}</div>
                    </div>
                </div>
                <div class="form-group row">
                    <label for="inputPassword" class="col-sm-3 col-form-label">Password</label>
                    <div class="col-sm-9">
                        <input v-model="user.password" @blur="validate()" type="password" class="form-control" v-bind:class="{'is-invalid': this.errors.password}"/>
                        <div class="invalid-feedback">{{errors.password}}</div>
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
    name: "user-form",
    computed: {
        ...mapGetters("user", ["user"])
    },
    data() {
        return {
            errors: {
                name: "",
                email: "",
                password: "",
            },
        }
    },
    async created(){
        if (this.$route.params.id){
            this.loadUser(this.$route.params.id);
        } else {
            this.setUser({})
        }
    },
    methods: {
        ...mapActions("user", ["loadUser", "updateUser", "createUser"]),
        ...mapMutations("user", ["setUser"]),
        validate(){
            let isValid = true;
            if (!this.user.name){
                this.errors.name = "Name is required!"
                isValid = false
            } else {
                this.errors.name = ""
            }

            if (!this.user.email){
                this.errors.email = "email is required!"
                isValid = false
            } else if(this.user.email.indexOf("@") == -1){
                this.errors.email = "email is invalid!"
                isValid = false
            } else {
                this.errors.email = ""
            }

            if (!this.user.password){
                this.errors.password = "password is required!"
                isValid = false
            } else if(this.user.password.length < 5){
                this.errors.password = "password must be more then 4 charecter"
                isValid = false
            } else {
                this.errors.password = ""
            }
            return isValid;
        },
        async save(){
            if (this.validate()){
                // Update
                let success = null
                if (this.user.id){
                    success = await this.updateUser(this.user);
                } else {
                    // Create
                    success = await this.createUser(this.user);
                }
                
                if (success){
                    this.$router.push({name: "user.list"})
                    return
                }
                alert("Some thing wrong")
            }
        },
    },
}
</script>