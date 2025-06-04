import { client } from '@/services/main.service'

export class TagService {
    static async getTags() {
        return await client.get('/tag')
    }

    static async createTag(model: any) {
        return await client.request({
            url: '/tag',
            method: 'post',
            data: model
        })
    }

    static async updateTag(id: number, obj: any) {
        return await client.request({
            url: `/tag/${id}`,
            method: 'put',
            data: obj
        })
    }

    static async deleteTag(id: number) {
        return await client.request({
            url: `/tag/${id}`,
            method: 'delete'
        })
    }
}
