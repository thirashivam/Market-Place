import axios from "axios";

const http = axios.create({
    baseURL: 'https://api.bongiapp.com/',
})

http.interceptors.request.use(request => {
    const access_token = sessionStorage.getItem('marketplace_access_token')

    if (access_token) {
        request.headers.Authorization = `Bearer ${access_token}`
    }
    

    return request
})

export default http