<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/configStore'
import WeatherLottie from './WeatherLottie.vue'

const props = defineProps({ city: { type: Object, required: true }, selectedCity: { type: Object, default: null }, isFavorite: Boolean })
const emit = defineEmits([
  'select-card',
  'click-detail',
  'toggle-favorite',
  'show-temp-tip',
  'show-air-tip',
])
const configStore = useConfigStore()

const displayTemp = computed(() => {
  const rawTemp = props.city.temp
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32)
  }
  return rawTemp
})

</script>

<template>
  <article class="weather-card" :class="{ selected: selectedCity?.id === city.id }" @click="emit('select-card', city)">
    <div class="card-top">
      <div class="place">
        <WeatherLottie :status="city.status" :size="46" />
        <div>
          <h3>{{ city.name }}</h3><span>{{ city.status }}</span>
        </div>
      </div><button class="detail-btn" @click.stop="emit('click-detail', city)">상세보기</button>
    </div>
    <div class="temp-readout"><span class="temp-number">{{ displayTemp }}</span><span class="temp-unit">{{
      configStore.unitSymbol
        }}</span></div>
    <button class="temp-status" :class="city.temp >= 25 ? 'hot' : 'cool'" @click.stop="emit('show-temp-tip', city)">{{
      city.temp >= 25 ? '🔥 더움 · 25도 이상' : '❄️ 선선함 · 25도 미만' }}</button>
    <button v-if="city.airQuality" class="air-badge" :class="`air-${city.airQuality.aqi}`" type="button"
      @click.stop="emit('show-air-tip', city)">
      미세먼지 {{ city.airQuality.label }}
    </button>
    <button class="fav-btn" :class="{ active: isFavorite }" @click.stop="emit('toggle-favorite', city.name)">{{
      isFavorite ? '★' : '☆' }}</button>
  </article>
</template>

<style scoped>
.weather-card {
  position: relative;
  padding: 20px 20px 56px;
  border: 1px solid var(--line);
  border-radius: 18px;
  background: var(--surface);
  cursor: pointer;
  transition: transform .15s, box-shadow .15s, border-color .15s;
}

.weather-card:hover {
  transform: translateY(-3px);
  border-color: transparent;
  box-shadow: 0 12px 24px rgb(28 35 51 / 8%);
}

.weather-card.selected {
  border-color: var(--accent-cool);
  box-shadow: 0 0 0 3px var(--accent-cool-soft);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 18px;
}

.place {
  display: flex;
  align-items: center;
  gap: 10px;
}

.place h3 {
  margin: 0;
  font-size: 17px;
}

.place span {
  color: var(--ink-soft);
  font-size: 12px;
}

.status-text {
  color: var(--ink-soft);
  font-size: 12px;
}

.detail-btn,
.temp-status,
.fav-btn {
  cursor: pointer;
  font-family: inherit;
}

.detail-btn {
  flex-shrink: 0;
  padding: 6px 12px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--bg);
  color: var(--ink);
  font-size: 12px;
}

.temp-readout {
  display: flex;
  align-items: flex-start;
  gap: 2px;
  margin-bottom: 14px;
  font-family: 'Outfit', sans-serif;
}

.temp-number {
  font-size: 44px;
  font-weight: 600;
  line-height: 1;
}

.temp-readout {
  display: flex;
  align-items: flex-start;
  gap: 2px;
  margin-bottom: 14px;
  font-family: 'Outfit', sans-serif;
}

.temp-unit {
  margin-top: 4px;
  color: var(--ink-soft);
  font-size: 16px;
}

.temp-status {
  border: 0;
  border-radius: 999px;
  padding: 6px 12px;
  font-size: 12px;
  font-weight: 700;
}

.fav-btn:hover {
  transform: scale(1.12) rotate(-8deg);
  color: #f2c94c;
}

.air-badge:hover,
.temp-status:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(28, 35, 51, 0.12);
}

.detail-btn:hover {
  background: var(--line);
}

.hot {
  background: #fff0ec;
  color: #ff6b4a;
}

.cool {
  background: var(--accent-cool-soft);
  color: var(--accent-cool);
}

.fav-btn {
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 34px;
  height: 34px;
  border: 0;
  border-radius: 50%;
  background: var(--surface);
  color: #c9cfdb;
  font-size: 17px;
  box-shadow: 0 2px 8px rgb(28 35 51 / 12%);
}

.fav-btn.active {
  background: linear-gradient(135deg, #ffd76a, #ffb020);
  color: #fff;
}

.air-badge {
  margin: 0 0 12px;
  padding: 6px 10px;
  border: 0;
  border-radius: 999px;
  font: inherit;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.air-1 {
  background: #e7f8ed;
  color: #25844b;
}

.air-2,
.air-3 {
  background: #fff6d8;
  color: #a87500;
}

.air-4 {
  background: #ffebe5;
  color: #d75a35;
}

.air-5 {
  background: #f8e8f3;
  color: #a0447e;
}
</style>
