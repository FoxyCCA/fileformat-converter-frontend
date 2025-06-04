import type { FileModel } from '@/model/file.model'
import type { UserModel } from '@/model/user.model'

export interface ConvertedModel {
    id: number
    conversionType: string
    originalFileId: FileModel
    convertedFileId: FileModel
    userId: UserModel
    createdAt: string
    updatedAt: string | null
}
