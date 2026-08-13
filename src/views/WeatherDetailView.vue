<script setup>

import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useConfigStore } from '../stores/configStore'
import { useCitiesStore } from '../stores/cities'

const props = defineProps({ cityId: { type: String, required: true } })

const router = useRouter()
const configStore = useConfigStore()
const citiesStore = useCitiesStore()

const statusIcon = (status) => ({ 맑음: '☀️', 비: '🌧️', 구름: '☁️', 눈: '❄️' }[status] ?? '🌤️')

const cityDetail = computed(() => {
  const city = citiesStore.weatherList.find((item) => item.id === props.cityId)
  if (!city) return null

  return {
    feelsLike: city.temp,
    humidity: 60,
    windSpeed: 2.5,
    precipitation: city.status === '비' ? 70 : 0,
    sunrise: '-',
    sunset: '-',
    updatedAt: '데이터 없음',
    description: city.status,
    ...city,
  }
})

const isRefreshing = ref(false)

async function refresh() {
  const city = citiesStore.weatherList.find((item) => item.id === props.cityId)
  if (!city) return
  isRefreshing.value = true
  await citiesStore.refreshCity(city)
  isRefreshing.value = false
}

const goHome = () => router.push('/')

// 상세 화면에 바로 진입한 경우(홈을 거치지 않은 경우)를 대비해 최신 데이터를 한 번 더 불러옵니다.
onMounted(refresh)

const displayTemp = (celsius) =>
  configStore.unit === 'fahrenheit' ? Math.round((celsius * 9) / 5 + 32) : celsius

</script>

<template>
  <section class="page">
    <template v-if="cityDetail">
      <p class="eyebrow">WEATHER DETAIL</p>
      <span class="icon">{{ statusIcon(cityDetail.status) }}</span>
      <h1>{{ cityDetail.name }}</h1>
      <p class="temperature">{{ displayTemp(cityDetail.temp) }}{{ configStore.unitSymbol }}</p>
      <p class="summary">
        현재 날씨는 <strong>{{ cityDetail.description ?? cityDetail.status }}</strong>이며, 체감 온도는 {{
          displayTemp(cityDetail.feelsLike) }}{{ configStore.unitSymbol }}입니다.
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
          <span class="label">강수량(1h)</span>
          <span class="value">{{ cityDetail.precipitation }} mm</span>
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

      <p class="updated">
        최근 업데이트 · {{ cityDetail.updatedAt }}
        <button class="refresh-btn" type="button" :disabled="isRefreshing" @click="refresh">
          {{ isRefreshing ? '새로고침 중…' : '⟳ 새로고침' }}
        </button>
      </p>
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

.refresh-btn {
  margin-left: 8px;
  padding: 3px 10px;
  border: 1px solid #dce3ed;
  border-radius: 999px;
  background: #ffffff;
  color: #3e8ed8;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.refresh-btn:disabled {
  color: #8f97a8;
  cursor: not-allowed;
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
