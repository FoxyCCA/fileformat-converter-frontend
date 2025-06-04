<script setup lang="ts">
import ConvertedTable from '@/components/ConvertedTable.vue'
import FileTable from '@/components/FileTable.vue'
import TagTable from '@/components/TagTable.vue'
import UserTable from '@/components/UserTable.vue'
import { ref } from 'vue'

const currentTab = ref('ConvertedTable')

const table = {
    ConvertedTable,
    FileTable,
    TagTable,
    UserTable
}
</script>

<template>
    <div class="d-flex flex-row justify-items-center justify-content-center h-100 w-100">
        <div class="container justify-content-center align-content-center w-100 table-wrapper">
            <div class="table-container">
                <button
                    v-for="(_, tab) in table"
                    :key="tab"
                    :class="['tab-button', { active: currentTab === tab }]"
                    @click="currentTab = tab"
                >
                    {{ tab }}
                </button>

                <component :is="table[currentTab]" class="tab"></component>
            </div>
        </div>
    </div>
</template>

<style>
.table-wrapper {
    margin-top: 100px;
}

.table-container {
    height: 500px;
}

.tab-button {
    background-color: var(--primary);
    border: 5px solid var(--primary);
    color: var(--background);
    margin-right: 10px;
    border-radius: 5px 5px 0px 0px;
    transition: 150ms;
}

.tab-button:hover {
    background-color: var(--accent);
    color: var(--text);
    border: 5px solid var(--accent);
}
</style>
