import { client } from '@/services/main.service'

export class ConverterService {
    static async convertFile(conversion: string, data: any) {
        return await client.request({
            url: `/convert-file/${conversion}`,
            method: 'post',
            data: data,
            responseType: 'blob'
        })
    }

    static async getConvertedFiles() {
        return await client.get('/convert-file')
    }

    static async updateConverted(id: number, obj: any) {
        return await client.request({
            url: `/convert-file/${id}`,
            method: 'put',
            data: obj
        })
    }

    static async deleteConverted(id: number) {
        return await client.request({
            url: `/convert-file/${id}`,
            method: 'delete'
        })
    }
}
