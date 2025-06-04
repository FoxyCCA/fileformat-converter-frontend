<script setup lang="ts">
import { ref } from 'vue'
import type { UserModel } from '@/model/user.model'
import { UserService } from '@/services/user.service'

const users = ref<UserModel[]>()
const modalUser = ref<UserModel>()
const modalCreateUser: UserModel = {
    username: '',
    email: ''
}

UserService.getUsers().then((rsp) => {
    users.value = rsp.data
})

function applyDataToModal(user: UserModel) {
    modalUser.value = user
}

function save() {
    console.log(modalUser.value)
    if (modalUser.value == undefined) return

    const changedUser = {
        userId: modalUser.value?.userId,
        username: modalUser.value?.username,
        email: modalUser.value?.email
    }
    UserService.updateUser(changedUser.userId, changedUser).then((rsp) => {
        console.log(rsp.data)
        if (users.value === undefined) return
        const index = users.value?.findIndex((user) => user.userId === rsp.data.userId)
        users.value[index] = rsp.data
    })
}

function create() {
    if (modalCreateUser.username === '') return
    UserService.createUser(modalCreateUser).then((rsp) => {
        users.value.push(rsp.data)
    })
}

function deleteUser(user: UserModel) {
    if (confirm('Are you sure?')) {
        UserService.deleteUser(user.userId).then((rsp) => {
            if (users.value == undefined) return
            users.value = users.value.filter((obj: any) => obj.userId !== user.userId)
        })
    }
}
</script>

<template>
    <div class="modal" tabindex="-1" id="editModal">
        <div class="modal-dialog">
            <div class="modal-content themed-modal">
                <div class="modal-header">
                    <h5 class="modal-title text">Update User</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body text" v-if="modalUser">
                    <div class="mb-3">
                        <label for="userId" class="form-label">ID:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="userId"
                            disabled
                            v-model="modalUser.userId"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="username" class="form-label">Username:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            v-model="modalUser.username"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="convertedType">Email:</label>
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            v-model="modalUser.email"
                        />
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
                    <h5 class="modal-title text">Create User</h5>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body text">
                    <div class="mb-3">
                        <label for="username" class="form-label">Username:</label>
                        <input
                            type="text"
                            class="form-control"
                            id="username"
                            v-model="modalCreateUser.username"
                        />
                    </div>
                    <div class="mb-3">
                        <label for="email" class="form-label">Email:</label>
                        <input
                            type="email"
                            class="form-control"
                            id="email"
                            v-model="modalCreateUser.email"
                        />
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-secondary" data-bs-dismiss="modal">
                        Close
                    </button>
                    <button type="button" class="btn btn-primary" @click="create()">Create</button>
                </div>
            </div>
        </div>
    </div>
    <div class="table-responsive themed scroll">
        <table v-if="users">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">USERNAME</th>
                    <th scope="col">EMAIL</th>
                    <th scope="col">CREATED AT</th>
                    <th scope="col">UPDATED AT</th>
                    <th scope="col">ACTIONS</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="user in users" :key="user.userId">
                    <td>{{ user.userId }}</td>
                    <td>{{ user.username }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ new Date(user.createdAt).toLocaleString('sr') }}</td>
                    <td>
                        <span v-if="user.updatedAt">{{
                            new Date(user.updatedAt).toLocaleString('sr')
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
                                @click="applyDataToModal(user)"
                            >
                                <i class="fa-solid fa-pen-to-square"></i>
                            </button>
                            <button
                                type="button"
                                class="btn btn-sm btn-danger"
                                @click="deleteUser(user)"
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
        Create new User
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
