import request from "./request"

export default {
    async login(email, password){
        let res = await request.post("/api/login", {email, password})
        if (res.data.sucess == false){
            return {user: null, token: null}
        }
        return res.data
    },
}