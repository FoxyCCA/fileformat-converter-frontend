<script setup lang="ts">
import { ref } from 'vue'
import type { TagModel } from '@/model/tag.model'
import { TagService } from '@/services/tag.service'

const tags = ref<TagModel[]>()
const modalTag = ref<TagModel>()
const modalCreateTag: TagModel = {
    name: ''
}
TagService.getTags().then((rsp) => {
    tags.value = rsp.data
})

function applyDataToModal(tag: TagModel) {
    modalTag.value = tag
}

function save() {
    console.log(modalTag.value)
    if (modalTag.value == undefined) return

    const changedTag = {
        tagId: modalTag.value?.tagId,
        name: modalTag.value?.name
    }
    TagService.updateTag(changedTag.tagId, changedTag).then((rsp) => {
        console.log(rsp.data)
        if (tags.value === undefined) return
        const index = tags.value?.findIndex((tag) => tag.tagId === rsp.data.tagId)
        tags.value[index] = rsp.data
    })
}

function create() {
    if (modalCreateTag.name === '') return
    TagService.createTag(modalCreateTag).then((rsp) => {
        tags.value.push(rsp.data)
    })
}

function deleteTag(tag: TagModel) {
    if (confirm('Are you sure?')) {
        TagService.deleteTag(tag.tagId).then((rsp) => {
            if (tags.value == undefined) return
            tags.value = tags.value.filter((obj: any) => obj.tagId !== tag.tagId)
        })
    }
}
</script>

<template>
    <div class="modal" tabindex="-1" id="editModal">
        <div class="modal-dialog">
            <div class="modal-content themed-modal">
                <div class="modal-header">
                    <h5 class="modal-title text">Update Tag</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body text" v-if="modalTag">
                    <div class="mb-3">
                        <label for="tagId" class="form-label">ID:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="tagId"
                            disabled
                            v-model="modalTag.tagId"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="name" class="form-label">Name:</label>
                        <input type="text" class="form-control" id="name" v-model="modalTag.name" />
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
    <div class="modal" tabindex="-1" id="createModal">
        <div class="modal-dialog">
            <div class="modal-content themed-modal">
                <div class="modal-header">
                    <h5 class="modal-title text">Create Tag</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body text">
                    <div class="mb-3">
                        <label for="name" class="convertedType">Name:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="name"
                            v-model="modalCreateTag.name"
                        />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn secondary-button" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn primary-button" @click="create()">
                        Create
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="table-responsive themed scroll">
        <table v-if="tags">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">NAME</th>
                    <th scope="col">CREATED AT</th>
                    <th scope="col">UPDATED AT</th>
                    <th scope="col">ACTIONS</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="tag in tags" :key="tag.tagId">
                    <td>{{ tag.tagId }}</td>
                    <td>{{ tag.name }}</td>
                    <td>{{ new Date(tag.createdAt).toLocaleString('sr') }}</td>
                    <td>
                        <span v-if="tag.updatedAt">{{
                            new Date(tag.updatedAt).toLocaleString('sr')
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
                                @click="applyDataToModal(tag)"
                            >
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-danger"
                                @click="deleteTag(tag)"
                            >
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <div v-else class="container text-center h-100">
            <p class="text-white">Loading data, please wait...</p>
        </div>
    </div>
    <button
        type="button"
        class="create-button"
        data-bs-toggle="modal"
        data-bs-target="#createModal"
    >
        Create new Tag
    </button>
</template>

<style>
.create-button {
    background-color: var(--primary);
    border-radius: 0px 0px 5px 5px;
    border: 5px solid var(--primary);
    width: 250px;
    transition: 150ms;
}

.create-button:hover {
    background-color: var(--accent);
    border: 5px solid var(--accent);
    color: var(--text);
}

.table-responsive {
    max-height: 500px;
}

.themed {
    background-color: var(--primary);
    border-radius: 0px 5px 5px 0px;
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
