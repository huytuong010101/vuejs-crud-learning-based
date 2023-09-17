import auth from "@/api/auth"
import request from "../api/request"

export default {
    namespaced: true,
    state: {
        user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {name: "Anonymous"} ,
        token: localStorage.getItem("token"),
        message: "",

    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setToken(state, token) {
            state.token = token
        },
        setMessage(state, message) {
            state.message = message
        },
    },
    getters: {
        user: state => state.user,
        token: state => state.token,
        message: state => state.message
    },
    actions: {
        async login({commit}, {email, password}){
            let {user, token} = await auth.login(email, password)
            if (user == null){
                commit("setMessage", "Email and password is not matching!")
                return false;
            }
            commit("setUser", user);
            commit("setToken", token);
            localStorage.setItem("token", token)
            localStorage.setItem("user", JSON.stringify(user))
            request.defaults.headers.common['Authorization'] = token
            return true;
        },
        async logout({commit}){
            commit("setUser", {name: "Anonymous"});
            commit("setToken", "");
            localStorage.removeItem("token")
            localStorage.removeItem("user")
            request.defaults.headers.common['Authorization'] = ""
        },
        
    }
}