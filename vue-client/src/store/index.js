import { createStore } from "vuex"
import product from "./product"
import user from "./user"
import auth from "./auth"

const store = createStore({
    modules: {
        product,
        user,
        auth
    },
    state: {
        user: {name: "Anonymous", auth: false}
    }
})

export default store