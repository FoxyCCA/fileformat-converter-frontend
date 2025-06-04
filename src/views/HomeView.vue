<script setup lang="ts"></script>

<template>
    <div
        class="d-flex flex-row justify-items-center align-items-center justify-content-center h-100 w-100"
    >
        <div class="container-sm d-flex flex-column justify-content-center align-content-center">
            <h1 class="text-white">
                Convert your <span class="im">images</span> and <span class="do">documents</span>
                <br />
                into other file types!
            </h1>
            <div>
                <button class="btn primary-button button">
                    <RouterLink to="/convert" class="text-decoration-none primary">
                        Convert File
                    </RouterLink>
                </button>
                <button class="btn secondary-button button">
                    <RouterLink to="/tables" class="text-white text-decoration-none">
                        See Tables
                    </RouterLink>
                </button>
            </div>
        </div>
    </div>
</template>

<style>
.im {
    background-image: linear-gradient(90deg, var(--accent), var(--secondary));
    background-clip: text;
    color: transparent;
}

.do {
    background-image: linear-gradient(90deg, var(--secondary), var(--accent));
    background-clip: text;
    color: transparent;
}

.button {
    width: 150px;
    margin: 20px;
}

.primary {
    color: var(--background);
}
</style>
