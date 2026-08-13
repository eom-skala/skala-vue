<script setup>

import { useConfigStore } from '../../stores/configStore'

const configStore = useConfigStore()
</script>

<template>
    <div class="unit-toggler" role="group" aria-label="온도 단위 설정">
        <button type="button" :class="{ active: configStore.unit === 'celsius' }"
            @click="configStore.unit === 'fahrenheit' && configStore.toggleUnit()">
            °C
        </button>
        <button type="button" :class="{ active: configStore.unit === 'fahrenheit' }"
            @click="configStore.unit === 'celsius' && configStore.toggleUnit()">
            °F
        </button>
    </div>
</template>

<style scoped>
.unit-toggler {
    display: inline-flex;
    gap: 2px;
    padding: 3px;
    border: 1px solid #dce3ed;
    border-radius: 999px;
    background: #ffffff;
}

.unit-toggler button {
    border: 0;
    border-radius: 999px;
    padding: 5px 12px;
    background: transparent;
    color: #5b6478;
    font: 700 12px 'Outfit', sans-serif;
    cursor: pointer;
    transition: background .15s, color .15s;
}

.unit-toggler button.active {
    background: #1c2333;
    color: #ffffff;
}
</style>
