<script setup lang="ts">
import { ref } from 'vue'
import type { ConvertedModel } from '@/model/converted.model'
import { ConverterService } from '@/services/converter.service'

const convertedFiles = ref<ConvertedModel[]>()
const modalConverted = ref<ConvertedModel>()

function applyDataToModal(converted: ConvertedModel) {
    modalConverted.value = converted
}

ConverterService.getConvertedFiles().then((rsp) => {
    convertedFiles.value = rsp.data
    console.log(convertedFiles.value)
})

function deleteConverted(converted: ConvertedModel) {
    if (confirm('Are you sure?')) {
        ConverterService.deleteConverted(converted.id).then((rsp) => {
            if (convertedFiles.value == undefined) return
            convertedFiles.value = convertedFiles.value.filter((obj) => obj.id !== converted.id)
        })
    }
}

function save() {
    // console.log(modalFile.value)
    if (modalConverted.value == undefined) return

    const changedConverted = {
        id: modalConverted.value?.id,
        conversionType: modalConverted.value?.conversionType,
        originalFileId: modalConverted.value?.originalFileId,
        convertedFileId: modalConverted.value?.convertedFileId,
        userId: modalConverted.value?.userId
    }
    ConverterService.updateConverted(changedConverted.id, changedConverted).then((rsp) => {
        console.log(rsp.data)
        if (convertedFiles.value === undefined) return
        const index = convertedFiles.value?.findIndex((converted) => converted.id === rsp.data.id)
        convertedFiles.value[index] = rsp.data
    })
}
</script>

<template>
    <div class="modal" tabindex="-1" id="editModal">
        <div class="modal-dialog">
            <div class="modal-content themed-modal">
                <div class="modal-header">
                    <h5 class="modal-title text">Update Converted</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body text" v-if="modalConverted">
                    <div class="mb-3">
                        <label for="id" class="form-label">ID:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="id"
                            disabled
                            v-model="modalConverted.id"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="convertedType" class="form-label">File Type:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="form-label"
                            v-model="modalConverted.conversionType"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="originalFileId" class="form-label">Original ID:</label>
                        <input
                            type="number"
                            class="form-control"
                            id="originalFileId"
                            v-model="modalConverted.originalFileId.fileId"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="convertedFileId" class="form-label">Converted ID:</label>
                        <input
                            type="number"
                            class="form-control"
                            id="convertedFileId"
                            v-model="modalConverted.convertedFileId.fileId"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="userId" class="form-label">User ID:</label>
                        <input
                            type="number"
                            class="form-control"
                            id="userId"
                            v-model="modalConverted.userId.userId"
                        />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn secondary-button" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button
                        type="button"
                        class="btn primary-button"
                        @click="save()"
                        data-bs-dismiss="modal"
                    >
                        Save changes
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="table-responsive themed scroll">
        <table class="table-hover" v-if="convertedFiles">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">CONVERSION TYPE</th>
                    <th scope="col">ORIGINAL ID</th>
                    <th scope="col">CONVERTED ID</th>
                    <th scope="col">USER ID</th>
                    <th scope="col">CREATED AT</th>
                    <th scope="col">UPDATED AT</th>
                    <th scope="col">ACTIONS</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="converted in convertedFiles" :key="converted.id">
                    <td>{{ converted.id }}</td>
                    <td>{{ converted.conversionType }}</td>
                    <td>{{ converted.originalFileId.fileId }}</td>
                    <td>{{ converted.convertedFileId.fileId }}</td>
                    <td>{{ converted.userId.userId }}</td>
                    <td>{{ new Date(converted.createdAt).toLocaleString('sr') }}</td>
                    <td>
                        <span v-if="converted.updatedAt">{{
                            new Date(converted.updatedAt).toLocaleString('sr')
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
                                @click="applyDataToModal(converted)"
                            >
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-danger"
                                @click="deleteConverted(converted)"
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
