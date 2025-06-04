<script setup lang="ts">
import { ref } from 'vue'
import type { FileModel } from '@/model/file.model'
import { FileService } from '@/services/file.service'
import type { TagModel } from '@/model/tag.model'
import { TagService } from '@/services/tag.service'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

const files = ref<FileModel[]>()
const modalFile = ref<FileModel>()
const tagTable = ref<TagModel[]>()
TagService.getTags().then((rsp) => {
    tagTable.value = rsp.data
})

var tagConstructor = {}

FileService.getFiles().then((rsp) => {
    files.value = rsp.data
    console.log(files)
})

function applyDataToModal(file: FileModel) {
    modalFile.value = file
}

function tags(fileTags: TagModel[]) {
    if (fileTags.length == 0) {
        return 'N/A'
    } else {
        var tagList = ''
        fileTags.forEach((tag) => {
            tagList += `${tag.name}\n`
        })
        return tagList
    }
}

function save() {
    console.log(modalFile.value)
    if (modalFile.value == undefined) return

    const changedFile = {
        fileId: modalFile.value?.fileId,
        fileName: modalFile.value?.fileName,
        fileType: modalFile.value?.fileType,
        fileSize: modalFile.value?.fileSize,
        filePath: modalFile.value?.filePath,
        fileTags: modalFile.value.fileTags.map((val) => {
            return {
                tagId: val
            }
        })
    }
    FileService.updateFile(changedFile.fileId, changedFile).then((rsp) => {
        console.log(rsp.data)
        if (files.value === undefined) return
        const index = files.value?.findIndex((file) => file.fileId === rsp.data.fileId)
        files.value[index] = rsp.data
    })
}

function deleteFile(file: FileModel) {
    if (confirm('Are you sure?')) {
        FileService.deleteFile(file.fileId).then((rsp) => {
            if (files.value == undefined) return
            files.value = files.value.filter((obj) => obj.fileId !== file.fileId)
        })
    }
}
</script>

<template>
    <div class="modal" tabindex="-1" id="editModal">
        <div class="modal-dialog">
            <div class="modal-content themed-modal">
                <div class="modal-header">
                    <h5 class="modal-title text">Update File</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body text" v-if="modalFile">
                    <div class="mb-3">
                        <label for="fileId" class="form-label">First ID:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="fileId"
                            disabled
                            v-model="modalFile.fileId"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="fileName" class="form-label">File Name:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="fileName"
                            v-model="modalFile.fileName"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="fileType" class="form-label">File Type:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="fileType"
                            v-model="modalFile.fileType"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="fileSize" class="form-label">File Size:</label>
                        <input
                            type="number"
                            class="form-control"
                            id="fileSize"
                            disabled
                            v-model="modalFile.fileSize"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="filePath" class="form-label">File Path:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="filePath"
                            disabled
                            v-model="modalFile.filePath"
                        />
                    </div>
                    <div class="form-check" v-for="t in tagTable" :key="t.tagId">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            :value="t.tagId"
                            id="tagCheck"
                            v-model="modalFile.fileTags"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                            {{ t.name }}
                        </label>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn secondary-button" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn primary-button" @click="save()">
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="table-responsive themed scroll">
        <table class="" v-if="files">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">FILE NAME</th>
                    <th scope="col">FILE TYPE</th>
                    <th scope="col">FILE SIZE</th>
                    <th scope="col" class="lewidth">FILE PATH</th>
                    <th scope="col">TAGS</th>
                    <th scope="col">CREATED AT</th>
                    <th scope="col">UPDATED AT</th>
                    <th scope="col">ACTIONS</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="file in files" :key="file.fileId">
                    <td>{{ file.fileId }}</td>
                    <td>{{ file.fileName }}</td>
                    <td>{{ file.fileType }}</td>
                    <td>{{ file.fileSize }}</td>
                    <td>{{ file.filePath }}</td>
                    <td>{{ tags(file.fileTags) }}</td>
                    <td>{{ new Date(file.createdAt).toLocaleString('sr') }}</td>
                    <td>
                        <span v-if="file.updatedAt">{{
                            new Date(file.updatedAt).toLocaleString('sr')
                        }}</span>
                        <span v-else>N/A</span>
                    </td>
                    <td>
                        <div class="btn-group">
                            <button
                                type="button"
                                class="btn btn-sm secondary-button"
                                data-bs-toggle="modal"
                                data-bs-target="#editModal"
                                @click="applyDataToModal(file)"
                            >
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-danger"
                                @click="deleteFile(file)"
                            >
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-else class="container text-center h-100">
            <p>Loading data, please wait...</p>
        </div>
    </div>
</template>

<style>
.test {
    width: 100px;
}

.table-responsive {
    max-height: 500px;
}

.themed {
    background-color: var(--primary);
    border-radius: 0px 5px 5px 5px;
}

.themed-modal {
    background-image: linear-gradient(300deg, var(--primary), var(--secondary));
}

.scroll::-webkit-scrollbar {
    width: 12px;
}

.scroll::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: var(--secondary);
}

.scroll::-webkit-scrollbar-corner {
    background-color: var(--primary);
}
</style>
