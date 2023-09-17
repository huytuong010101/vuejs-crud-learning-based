import product from "@/api/product";

export default {
    namespaced: true,
    state: {
        products: [],
        product: {
            name: "",
            price: 0,
            description: ""
        }
    },
    mutations: {
        setProduct(state, product) {
            state.product = product
        },
        setProducts(state, products) {
            state.products = products
        },
    },
    getters: {
        product: state => state.product,
        products: state => state.products,

    },
    actions: {
        async loadAllProduct({commit}){
            commit("setProducts", await product.gets());
        },
        async loadProduct({commit}, id){
            commit("setProduct", await product.get(id));
        },
        async deleteProduct({}, id){
            return await product.delete(id)
        },
        async createProduct({}, data){
            return await product.create(data)
        },
        async updateProduct({}, data){
            return await product.update(data.id, data)
        },
    }
}