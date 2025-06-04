import { client } from '@/services/main.service'

export class UserService {
    static async getUsers() {
        return await client.get('/user')
    }

    static async createUser(model: any) {
        return await client.request({
            url: '/user',
            method: 'post',
            data: model
        })
    }

    static async updateUser(id: number, obj: any) {
        return await client.request({
            url: `/user/${id}`,
            method: 'put',
            data: obj
        })
    }

    static async deleteUser(id: number) {
        return await client.request({
            url: `/user/${id}`,
            method: 'delete'
        })
    }
}
