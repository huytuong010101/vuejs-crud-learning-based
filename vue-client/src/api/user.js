import request from "./request"

export default {
    async get(id){
        let res = await request.get("/api/users/" + id)
        return res.data
    },
    async gets(){
        let res = await request.get("/api/users")
        return res.data
    },
    async update(id, data){
        let res = await request.put("/api/users/" + id, data);
        return res.data.success
    },
    async create(data){
        let res = await request.post("/api/users", data);
        return res.data.success
    },
    async delete(id){
        let res = await request.delete("/api/users/" + id);
        return res.data.success
    },
}