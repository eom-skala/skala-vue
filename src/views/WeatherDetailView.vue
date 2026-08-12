<script setup>

import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/config'

const props = defineProps({
  cityId: { type: String, required: true },
})

const router = useRouter()
const configStore = useConfigStore()

const mockDetailData = {
  city_01: {
    name: '서울', temp: 28, status: '맑음', feelsLike: 30,
    humidity: 55, windSpeed: 2.4, precipitation: 0, uvIndex: 7,
    sunrise: '05:12', sunset: '19:48', updatedAt: '10분 전',
  },
  city_02: {
    name: '수원', temp: 24, status: '비', feelsLike: 23,
    humidity: 82, windSpeed: 4.1, precipitation: 70, uvIndex: 2,
    sunrise: '05:13', sunset: '19:47', updatedAt: '10분 전',
  },
  city_03: {
    name: '부산', temp: 26, status: '구름', feelsLike: 27,
    humidity: 68, windSpeed: 3.2, precipitation: 20, uvIndex: 4,
    sunrise: '05:07', sunset: '19:41', updatedAt: '10분 전',
  },
}

const statusIcon = (status) => ({ 맑음: '☀️', 비: '🌧️', 구름: '☁️' }[status] ?? '🌤️')

const cityDetail = ref(null)
onMounted(() => {
  cityDetail.value = mockDetailData[props.cityId] ?? null
})

const goHome = () => router.push('/')

const unitSymbol = computed(() => (configStore.unit === 'fahrenheit' ? '°F' : '°C'))
const displayTemp = (celsius) =>
  configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius
</script>

<template>
  <section class="page">
    <template v-if="cityDetail">
      <p class="eyebrow">WEATHER DETAIL</p>
      <span class="icon">{{ statusIcon(cityDetail.status) }}</span>
      <h1>{{ cityDetail.name }}</h1>
      <p class="temperature">{{ displayTemp(cityDetail.temp) }}{{ unitSymbol }}</p>
      <p class="summary">
        현재 날씨는 <strong>{{ cityDetail.status }}</strong>이며, 체감 온도는 {{ displayTemp(cityDetail.feelsLike) }}{{ unitSymbol }}입니다.
      </p>

      <div class="detail-grid">
        <div class="detail-item">
          <span class="label">습도</span>
          <span class="value">{{ cityDetail.humidity }}%</span>
        </div>
        <div class="detail-item">
          <span class="label">풍속</span>
          <span class="value">{{ cityDetail.windSpeed }} m/s</span>
        </div>
        <div class="detail-item">
          <span class="label">강수확률</span>
          <span class="value">{{ cityDetail.precipitation }}%</span>
        </div>
        <div class="detail-item">
          <span class="label">자외선지수</span>
          <span class="value">{{ cityDetail.uvIndex }}</span>
        </div>
        <div class="detail-item">
          <span class="label">일출</span>
          <span class="value">{{ cityDetail.sunrise }}</span>
        </div>
        <div class="detail-item">
          <span class="label">일몰</span>
          <span class="value">{{ cityDetail.sunset }}</span>
        </div>
      </div>

      <p class="updated">최근 업데이트 · {{ cityDetail.updatedAt }}</p>
    </template>

    <template v-else>
      <p class="eyebrow">WEATHER DETAIL</p>
      <h1>도시 정보를 찾을 수 없습니다.</h1>
      <p class="summary">요청하신 도시 코드({{ cityId }})에 해당하는 관측 데이터가 없어요.</p>
    </template>

    <button class="back-btn" @click="goHome">← 대시보드로 돌아가기</button>
  </section>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&family=Noto+Sans+KR:wght@400;700;900&display=swap');

.page {
  min-height: calc(100vh - 53px);
  padding: 72px 24px 64px;
  background: #eef2f7;
  color: #1c2333;
  text-align: center;
  font-family: 'Noto Sans KR', sans-serif;
}

.eyebrow {
  margin: 0 0 12px;
  font: 700 12px 'Outfit', sans-serif;
  letter-spacing: 3px;
  color: #3e8ed8;
}

.icon {
  display: block;
  font-size: 40px;
  margin-bottom: 4px;
}

.page h1 {
  margin: 0 0 4px;
  font-size: 32px;
}

.temperature {
  margin: 8px 0;
  font-size: 56px;
  font-weight: 900;
  font-family: 'Outfit', sans-serif;
}

.summary {
  max-width: 420px;
  margin: 0 auto 28px;
  color: #5b6478;
}

.summary strong {
  color: #1c2333;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  max-width: 560px;
  margin: 0 auto;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 16px 12px;
  border: 1px solid #dce3ed;
  border-radius: 14px;
  background: #ffffff;
}

.detail-item .label {
  font-size: 12px;
  color: #5b6478;
}

.detail-item .value {
  font-size: 18px;
  font-weight: 700;
  font-family: 'Outfit', sans-serif;
}

.updated {
  margin-top: 20px;
  font-size: 12px;
  color: #8f97a8;
}

.back-btn {
  display: inline-block;
  margin-top: 32px;
  padding: 10px 20px;
  border: 1px solid #dce3ed;
  border-radius: 999px;
  background: #ffffff;
  color: #3e8ed8;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}

.back-btn:hover {
  background: #eaf4fc;
}
</style>
