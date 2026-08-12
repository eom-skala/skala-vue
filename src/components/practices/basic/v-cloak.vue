<script setup>
import { ref } from 'vue'

const message = ref('안녕하세요!')
</script>

<template>
    <div v-cloak class="practice-section">
        <h2>v-cloak 디렉티브 학습</h2>
        <p v-cloak>{{ message }}</p>
    </div>
</template>

<style scoped>
[v-cloak] {
    display: none !important;
}
</style>