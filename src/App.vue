<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarRoute from '@/components/NavbarRoute.vue'
</script>

<template>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Roboto+Mono:ital,wght@0,100..700;1,100..700&family=Roboto:wght@400;700&display=swap"
        rel="stylesheet"
    />

    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
        href="https://fonts.googleapis.com/css2?family=Madimi+One&display=swap"
        rel="stylesheet"
    />

    <header class="position-absolute top-0 container-fluid">
        <nav class="navbar navbar-expand-sm navbar-light bg-transparent">
            <div class="container-fluid justify-content-center">
                <ul class="navbar-nav">
                    <NavbarRoute to="/" name="Home" />
                    <NavbarRoute to="/convert" name="Convert" />
                    <NavbarRoute to="/tables" name="Tables" />
                </ul>
            </div>
        </nav>
    </header>

    <RouterView />
    <footer class="footer">&copy; Vikentij Zadko 2021230265</footer>
</template>

<style>
#app {
    width: 100%;
    height: 95%;
}

.footer {
    color: var(--text);
    text-align: center;
}
</style>
