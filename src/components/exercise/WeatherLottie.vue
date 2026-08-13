<script setup>
import { computed } from 'vue'
import { Vue3Lottie } from 'vue3-lottie'
import sunny from '../../assets/lottie/weather-sunny.json'
import rainy from '../../assets/lottie/weather-rainy.json'
import cloudy from '../../assets/lottie/weather-cloudy.json'
import snowy from '../../assets/lottie/weather-snowy.json'

const props = defineProps({
    status: { type: String, default: '맑음' },
    size: { type: Number, default: 48 },
})

const animationData = computed(() => ({
    맑음: sunny,
    비: rainy,
    구름: cloudy,
    눈: snowy,
}[props.status] ?? cloudy))
</script>

<template>
    <Vue3Lottie :animationData="animationData" :height="size" :width="size" :loop="true" :autoPlay="true"
        renderer="svg" />
</template>
