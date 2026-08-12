<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import BaseDashboardCard from './BaseDashboardCard.vue'
import SearchBar from './SearchBar.vue'
import WeatherCard from './WeatherCard.vue'
import FeedbackPanel from '../practices/weather/FeedbackPanel.vue'

const weatherList = ref([
  { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
  { id: 'city_02', name: '수원', temp: 24, status: '비' },
  { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])
const searchQuery = ref('')
const selectedCityInfo = ref('')
const sortOrder = ref('name')
const favoriteCities = ref([])
const tempTipCity = ref('')
const tempTip = ref('')

const selectedCity = computed(() =>
  weatherList.value.find((city) => city.name === selectedCityInfo.value) ?? null,
)

const pageThemeClass = computed(() => {
  const themes = { 맑음: 'theme-sunny', 비: 'theme-rain', 구름: 'theme-cloud' }
  return selectedCity.value ? themes[selectedCity.value.status] ?? 'theme-default' : ''
})

const filteredWeatherList = computed(() => {
  const query = searchQuery.value.trim()
  return query ? weatherList.value.filter((city) => city.name.includes(query)) : weatherList.value
})

const sortedFilteredList = computed(() => {
  const list = [...filteredWeatherList.value]
  return sortOrder.value === 'temp'
    ? list.sort((a, b) => b.temp - a.temp)
    : list.sort((a, b) => a.name.localeCompare(b.name))
})

const averageTemp = computed(() => {
  if (!filteredWeatherList.value.length) return 0
  const total = filteredWeatherList.value.reduce((sum, city) => sum + city.temp, 0)
  return Math.round((total / filteredWeatherList.value.length) * 10) / 10
})

function selectCity(city) {
  selectedCityInfo.value = city.name
}

function showDetail(city) {
  window.alert(`${city.name}의 현재 날씨는 [${city.status}] 상태입니다.`)
}

function toggleFavorite(cityName) {
  const index = favoriteCities.value.indexOf(cityName)
  index === -1 ? favoriteCities.value.push(cityName) : favoriteCities.value.splice(index, 1)
}

function showTempTip(city) {
  const message = city.temp >= 28
    ? '🥵 폭염 수준이에요. 야외 활동은 자제하고 수분을 충분히 섭취하세요.'
    : city.temp >= 25
      ? '🔥 더운 날씨예요. 가볍고 통풍이 잘되는 옷차림을 추천해요.'
      : city.temp >= 20
        ? '🌤️ 활동하기 좋은 선선한 날씨예요. 얇은 겉옷 하나면 충분해요.'
        : '❄️ 쌀쌀한 날씨예요. 따뜻한 겉옷을 챙기는 걸 추천해요.'
  tempTipCity.value = city.name
  tempTip.value = message
}

watch(selectedCityInfo, (current, previous) => console.log(`[watch] selectedCityInfo 변경: ${previous} → ${current}`))
watchEffect(() => console.log(`[watchEffect] 현재 검색어: "${searchQuery.value}"`))
watch(sortOrder, (current, previous) => console.log(`[watch] 정렬 기준 변경: ${previous} → ${current}`))
watch(favoriteCities, (cities) => console.log(`[watch] 즐겨찾기 목록 변경 (총 ${cities.length}개):`, cities), { deep: true })

</script>

<template>
  <main class="page" :class="pageThemeClass">
    <header class="hero">
      <p class="skala">SKALA</p>
      <p class="eyebrow">TODAY'S WEATHER</p>
      <h1>오늘의 날씨</h1>
      <p class="hero-sub">도시를 검색하거나 카드를 눌러 살펴보세요</p>
    </header>

    <BaseDashboardCard>
      <template #search>
        <SearchBar :query="searchQuery" @update-query="searchQuery = $event" />
      </template>

      <template #weather>
        <div class="list-header">
          <h2>지역별 날씨 현황</h2>
          <div class="sort-toggle" role="group" aria-label="정렬 기준">
            <button :class="{ active: sortOrder === 'name' }" @click="sortOrder = 'name'">이름순</button>
            <button :class="{ active: sortOrder === 'temp' }" @click="sortOrder = 'temp'">온도순</button>
          </div>
        </div>
        <p v-if="sortedFilteredList.length" class="avg-readout">
          평균 기온 · <strong>{{ averageTemp }}°C</strong> · 즐겨찾기 {{ favoriteCities.length }}곳
        </p>

        <TransitionGroup v-if="sortedFilteredList.length" name="card" tag="div" class="weather-grid">
          <WeatherCard v-for="city in sortedFilteredList" :key="city.id" :city="city" :selected-city="selectedCity"
            :is-favorite="favoriteCities.includes(city.name)" @select-card="selectCity" @click-detail="showDetail"
            @toggle-favorite="toggleFavorite" @show-temp-tip="showTempTip" />
        </TransitionGroup>
        <div v-else class="no-result">
          <p class="no-result-icon">🔍</p>
          <p>검색 결과와 일치하는 도시가 없습니다.</p>
        </div>
      </template>
    </BaseDashboardCard>

    <FeedbackPanel :selected-city-name="selectedCityInfo" :tip-city="tempTipCity" :tip="tempTip" />
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;700;900&display=swap');

.page {
  --bg: #eef2f7;
  --surface: #fff;
  --ink: #1c2333;
  --ink-soft: #5b6478;
  --line: #dce3ed;
  --accent-cool: #3e8ed8;
  --accent-cool-soft: #eaf4fc;
  width: 100%;
  min-height: 100vh;
  padding: 48px 24px 64px;
  background: var(--bg);
  color: var(--ink);
  font-family: 'Noto Sans KR', sans-serif;
  transition: background .5s ease;
}

.theme-sunny {
  background: linear-gradient(160deg, #fff8e1, #ffe19a);
}

.theme-rain {
  background: linear-gradient(160deg, #eaf4fc, #bcdcf2);
}

.theme-cloud {
  background: linear-gradient(160deg, #f4f6fa, #d3dbe6);
}

.hero {
  max-width: 760px;
  margin: 0 auto 36px;
  text-align: center;
}

.skala {
  margin: 0 0 50px;
  font: 1000 12px 'Outfit', sans-serif;
  letter-spacing: 4px;
  color: #000;
}

.eyebrow {
  margin: 0 0 10px;
  font: 600 12px 'Outfit', sans-serif;
  letter-spacing: 4px;
  color: var(--accent-cool);
}

.hero h1 {
  margin: 0 0 8px;
  font-size: 40px;
  letter-spacing: -1px;
}

.hero-sub,
.avg-readout {
  color: var(--ink-soft);
  font-size: 14px;
}

.hero-sub {
  margin: 0;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 8px;
}

.list-header h2 {
  margin: 0;
  font-size: 18px;
}

.avg-readout {
  margin: 0 0 16px;
  font-size: 13px;
}

.avg-readout strong {
  color: var(--ink);
}

.sort-toggle {
  display: inline-flex;
  gap: 2px;
  padding: 3px;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: var(--surface);
}

.sort-toggle button {
  border: 0;
  border-radius: 999px;
  padding: 6px 16px;
  background: transparent;
  color: var(--ink-soft);
  font: 500 13px inherit;
  cursor: pointer;
}

.sort-toggle button.active {
  background: var(--ink);
  color: #fff;
  font-weight: 700;
}

.weather-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 16px;
}

.no-result {
  padding: 60px 20px;
  border: 1px dashed var(--line);
  border-radius: 18px;
  background: var(--surface);
  color: var(--ink-soft);
  text-align: center;
}

.no-result-icon {
  margin: 0 0 8px;
  font-size: 28px;
}

.card-move,
.card-enter-active,
.card-leave-active {
  transition: all .25s ease;
}

.card-enter-from,
.card-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

.card-leave-active {
  position: absolute;
}

@media (max-width:560px) {
  .page {
    padding: 32px 16px 48px;
  }

  .hero h1 {
    font-size: 32px;
  }
}
</style>
