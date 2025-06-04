<script setup lang="ts">
import { saveAs } from 'file-saver'
import { ConverterService } from '@/services/converter.service'
import { ref } from 'vue'

const data = {
    opt: 'Png -> Jpg',
    file: null,
    fileName: ''
}

const fileInput = ref('+')

function appendFile(dataInput: any) {
    const file = dataInput.target.files[0]
    console.log(file)
    data.file = file
    if (file.name.length > 15) {
        fileInput.value = file.name.slice(0, 15) + ' ...'
    } else {
        fileInput.value = file.name
    }
    console.log(fileInput.value)
}

function save() {
    console.log(data)
    const formData = new FormData()
    const fileName = data.file!.name.split('.')[0]
    formData.append('file', data.file)
    formData.append('fileName', fileName)

    if (data.opt === 'pngtojpg') {
        ConverterService.convertFile(data.opt, formData).then((rsp) => {
            saveAs(rsp.data, fileName + '.jpeg')
        })
    }

    if (data.opt === 'jpgtopng') {
        ConverterService.convertFile(data.opt, formData).then((rsp) => {
            saveAs(rsp.data, fileName + '.png')
        })
    }

    if (data.opt === 'webptopng') {
        ConverterService.convertFile(data.opt, formData).then((rsp) => {
            saveAs(rsp.data, fileName + '.png')
        })
    }

    if (data.opt === 'pdftodocx') {
        ConverterService.convertFile(data.opt, formData).then((rsp) => {
            saveAs(rsp.data, fileName + '.docx')
        })
    }

    if (data.opt === 'docxtopdf') {
        ConverterService.convertFile(data.opt, formData).then((rsp) => {
            saveAs(rsp.data, fileName + '.pdf')
        })
    }
}
</script>

<template>
    <div class="d-flex flex-row justify-content-center align-self-center h-100">
        <form
            name="convForm"
            class="mb-3 d-flex flex-column justify-self-center align-self-center h-50 w-50"
        >
            <label for="formFile" class="form-label text">Select File Type</label>
            <select
                class="select"
                aria-label="Default select example"
                name="selection"
                required
                v-model="data.opt"
            >
                <option value="pngtojpg" selected>Png -> Jpg</option>
                <option value="jpgtopng">Jpg -> Png</option>
                <option value="webptopng">Webp -> Png</option>
                <option value="pdftodocx">Pdf -> Docx</option>
                <option value="docxtopdf">Docx -> Pdf</option>
            </select>
            <label for="formFile" class="form-label text">Select/drag your file here</label>
            <input
                type="button"
                :value="fileInput"
                class="file-upload-button"
                onclick="document.getElementById('file').click();"
            />
            <input
                name="uploader"
                class="file-upload"
                type="file"
                id="file"
                v-on:change="appendFile"
            />
            <button type="button" class="btn primary-button" @click="save()">
                Convert my File
            </button>
        </form>
    </div>
</template>

<style>
.file-upload {
    visibility: hidden;
}

.file-upload-button {
    background: transparent;
    border: 5px solid var(--secondary);
    border-radius: 5px;
    height: 400px;
    margin-bottom: 20px;
    font-size: 30px;
    text-align: center;
    word-wrap: anywhere;
    font-family: 'Madimi One', sans-serif;
    color: var(--secondary);
    transition: 150ms;
}

.file-upload-button:hover {
    border: 5px solid var(--accent);
    color: var(--accent);
}

.select {
    background-color: var(--secondary);
    border-radius: 5px;
    border: 5px solid var(--secondary);
    color: var(--text);
    text-align: center;
    margin-bottom: 30px;
}
</style>
