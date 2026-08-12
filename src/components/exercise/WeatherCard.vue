<script setup>
import { computed } from 'vue'
import { useConfigStore } from '../../stores/config'

const props = defineProps({ city: { type: Object, required: true }, selectedCity: { type: Object, default: null }, isFavorite: Boolean })
const emit = defineEmits(['select-card', 'click-detail', 'toggle-favorite', 'show-temp-tip'])
const statusIcon = (status) => ({ 맑음: '☀️', 비: '🌧️', 구름: '☁️' }[status] ?? '🌤️')

const configStore = useConfigStore()

// [본인 추가] configStore.unit에 따라 표시 온도를 변환
const displayTemp = computed(() => {
  const rawTemp = props.city.temp // 기본 원본 데이터는 섭씨 숫자
  if (configStore.unit === 'fahrenheit') {
    return Math.round((rawTemp * 9) / 5 + 32) // 화씨 변환 연산
  }
  return rawTemp // 'celsius'일 때는 원본 그대로 반환
})

const unitSymbol = computed(() => (configStore.unit === 'fahrenheit' ? '°F' : '°C'))
</script>

<template>
  <article class="weather-card" :class="{ selected: selectedCity?.id === city.id }" @click="emit('select-card', city)">
    <div class="card-top">
      <div class="place"><span class="icon">{{ statusIcon(city.status) }}</span>
        <div>
          <h3>{{ city.name }}</h3><span>{{ city.status }}</span>
        </div>
      </div><button class="detail-btn" @click.stop="emit('click-detail', city)">상세보기</button>
    </div>
    <div class="temp-readout"><span class="temp-number">{{ displayTemp }}</span><span class="temp-unit">{{ unitSymbol
    }}</span></div>
    <button class="temp-status" :class="city.temp >= 25 ? 'hot' : 'cool'" @click.stop="emit('show-temp-tip', city)">{{
      city.temp >= 25 ? '🔥 더움 · 25도 이상' : '❄️ 선선함 · 25도 미만' }}</button>
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

.icon {
  font-size: 26px;
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
</style>