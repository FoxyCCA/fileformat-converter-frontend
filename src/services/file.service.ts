import { client } from '@/services/main.service'

export class FileService {
    static async getFiles() {
        return await client.get('/file')
    }

    static async updateFile(id: number, obj: any) {
        return await client.request({
            url: `/file/${id}`,
            method: 'put',
            data: obj
        })
    }

    static async deleteFile(id: number) {
        return await client.request({
            url: `/file/${id}`,
            method: 'delete'
        })
    }
}
