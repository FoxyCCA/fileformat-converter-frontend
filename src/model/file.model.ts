import type { TagModel } from '@/model/tag.model'

export interface FileModel {
    fileId: number
    fileName: string
    fileType: string
    fileSize: number
    filePath: string
    fileTags: TagModel[]
    createdAt: string
    updatedAt: string | null
}
