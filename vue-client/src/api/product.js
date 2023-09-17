import request from "./request"

export default {
    async get(id){
        let res = await request.get("/api/products/" + id)
        return res.data
    },
    async gets(){
        let res = await request.get("/api/products")
        return res.data
    },
    async update(id, data){
        let res = await request.put("/api/products/" + id, data);
        return res.data.success
    },
    async create(data){
        let res = await request.post("/api/products", data);
        return res.data.success
    },
    async delete(id){
        let res = await request.delete("/api/products/" + id);
        return res.data.success
    },
}