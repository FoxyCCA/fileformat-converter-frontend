<script setup lang="ts">
import { RouterLink } from 'vue-router'

export interface NavbarRouteProps {
    to: string
    name: string
}

const { to, name } = defineProps<NavbarRouteProps>()
</script>

<template>
    <li class="nav-item">
        <RouterLink class="text navigation" :to="to">
            {{ name }}
        </RouterLink>
    </li>
</template>

<style>
.navigation {
    transition: 150ms;
    text-decoration: none;
    padding: 10px;
    font-weight: bold;
}

.navigation:hover {
    color: var(--accent);
    margin-left: 10px;
    margin-right: 10px;
}
</style>
