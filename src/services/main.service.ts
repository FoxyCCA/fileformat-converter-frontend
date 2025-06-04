import axios from 'axios'

export const client = axios.create({
    baseURL: 'http://localhost:8080/api',
    validateStatus: (status) => status == 200 || status == 204
})
