import user from "@/api/user";

export default {
    namespaced: true,
    state: {
        users: [],
        user: {
            name: "",
            email: "",
            password: ""
        }
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        setUsers(state, users) {
            state.users = users
        },
    },
    getters: {
        user: state => state.user,
        users: state => state.users,

    },
    actions: {
        async loadAllUser({commit}){
            commit("setUsers", await user.gets());
        },
        async loadUser({commit}, id){
            commit("setUser", await user.get(id));
        },
        async deleteUser({}, id){
            return await user.delete(id)
        },
        async createUser({}, data){
            return await user.create(data)
        },
        async updateUser({}, data){
            return await user.update(data.id, data)
        },
    }
}