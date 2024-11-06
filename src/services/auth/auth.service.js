import httpClient from "@/services/http.service";

const authService = {
    async login(form){
        try {
            const {data, status} = await httpClient.post('auth/login', {password: form.password, email: form.email})
            if (status == 200){
                localStorage.setItem('access_token', data.token)
                localStorage.setItem('role', data.role)
                console.log('login')
                return true
            }
        } catch (e) {
            console.log(e)
        }
    },
    async register(form){
        try {
            const {data, status} = await httpClient.post('auth/register', form)
            if (status == 201){
                localStorage.setItem('access_token', data.token)
                localStorage.setItem('role', data.role)
                console.log('register')
                return true
            }
        } catch (e) {
            console.log(e)
        }
    },
    async me(){
        try {
            const {status, data } = await httpClient.get('auth/me');
            if (status == 200){
                return data.data
            }
        } catch (e) {
            console.log(e)
        }
    },
    logout(){
        localStorage.removeItem('access_token')
        localStorage.removeItem('role')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        return true
    }
}

export default authService;