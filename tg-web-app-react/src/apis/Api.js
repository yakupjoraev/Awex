import axios from 'axios'
import cookies from '../services/cookies'
import config from '../config.json'

let BaseApi = axios.create({
    baseURL: config.apiUrl
})

let Api = () => {
    let token = cookies.get('token')

    if(token) {
        BaseApi.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

    return BaseApi
}

export default Api
