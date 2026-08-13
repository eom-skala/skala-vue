<script setup>
import { computed, onMounted, ref, watch, watchEffect } from 'vue'
import { useGeolocation } from '@vueuse/core'
import { Vue3Lottie } from 'vue3-lottie'
import weatherSun from '../data/weather-sun.json'
import { useRouter } from 'vue-router'
import BaseDashboardCard from '../components/exercise/BaseDashboardCard.vue'
import SearchBar from '../components/exercise/SearchBar.vue'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import FeedbackPanel from '../components/practices/weather/FeedbackPanel.vue'
import { useFavoritesStore } from '../stores/favorites'
import { useCitiesStore } from '../stores/cities'
import { useConfigStore } from '../stores/configStore'

const router = useRouter()
const favoritesStore = useFavoritesStore()
const citiesStore = useCitiesStore()
const configStore = useConfigStore()
const weatherList = computed(() => citiesStore.weatherList)
const searchQuery = ref('')
const selectedCityInfo = ref('')
const sortOrder = ref('name')
const tempTipCity = ref('')
const tempTip = ref('')
const isLocating = ref(false)
const locationError = ref('')
const { coords, error: geolocationError, resume, pause } = useGeolocation({ immediate: false, enableHighAccuracy: false, timeout: 10000, maximumAge: 300000 })

const selectedCity = computed(() =>
    weatherList.value.find((city) => city.name === selectedCityInfo.value) ?? null,
)

const pageThemeClass = computed(() => {
    const themes = { 맑음: 'theme-sunny', 비: 'theme-rain', 구름: 'theme-cloud' }
    return selectedCity.value ? (themes[selectedCity.value.status] ?? 'theme-default') : ''
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

const displayAverageTemp = computed(() =>
    configStore.unit === 'fahrenheit' ? Math.round((averageTemp.value * 9) / 5 + 32) : averageTemp.value,
)

function selectCity(city) {
    selectedCityInfo.value = city.name
}

function showDetail(city) {
    router.push(`/weather/${city.id}`)
}

function showTempTip(city) {
    const message =
        city.temp >= 28
            ? '🥵 폭염 수준이에요. 야외 활동은 자제하고 수분을 충분히 섭취하세요.'
            : city.temp >= 25
                ? '🔥 더운 날씨예요. 가볍고 통풍이 잘되는 옷차림을 추천해요.'
                : city.temp >= 20
                    ? '🌤️ 활동하기 좋은 선선한 날씨예요. 얇은 겉옷 하나면 충분해요.'
                    : '❄️ 쌀쌀한 날씨예요. 따뜻한 겉옷을 챙기는 걸 추천해요.'
    tempTipCity.value = city.name
    tempTip.value = message
}

function showAirTip(city) {
    const pm25 = city.airQuality?.pm25 ?? 0
    const message = pm25 <= 15
        ? '😊 공기가 깨끗해요. 야외 활동하기 좋은 날입니다.'
        : pm25 <= 35
            ? '🙂 대기질이 보통이에요. 민감한 분은 장시간 야외 활동에 유의하세요.'
            : pm25 <= 75
                ? '😷 미세먼지 농도가 높아요. 외출 시 마스크 착용을 권장합니다.'
                : '🚨 미세먼지 농도가 매우 높아요. 가급적 실외 활동을 줄여 주세요.'
    tempTipCity.value = `${city.name} · 미세먼지 ${city.airQuality.label}`
    tempTip.value = message
}

function addCurrentLocation() {
    locationError.value = ''
    isLocating.value = true
    resume()
}

watch(() => coords.value.latitude, async (latitude) => {
    const longitude = coords.value.longitude
    if (!isLocating.value || !Number.isFinite(latitude) || !Number.isFinite(longitude)) return
    pause()
    try {
        const result = await citiesStore.addCurrentLocation({ lat: latitude, lon: longitude })
        if (result.ok) selectCity(result.city)
    } catch {
        locationError.value = '내 위치 날씨를 가져오지 못했습니다.'
    } finally {
        isLocating.value = false
    }
})

watch(geolocationError, (error) => {
    if (!error || !isLocating.value) return
    locationError.value = error.message || '위치 정보 권한을 허용해 주세요.'
    isLocating.value = false
    pause()
})

watch(selectedCityInfo, (current, previous) =>
    console.log(`[watch] selectedCityInfo 변경: ${previous} → ${current}`),
)
watchEffect(() => console.log(`[watchEffect] 현재 검색어: "${searchQuery.value}"`))
watch(sortOrder, (current, previous) =>
    console.log(`[watch] 정렬 기준 변경: ${previous} → ${current}`),
)
watch(
    () => favoritesStore.favoriteCities,
    (cities) => console.log(`[watch] 즐겨찾기 목록 변경 (총 ${cities.length}개):`, cities),
    { deep: true },
)

onMounted(() => citiesStore.fetchAllWeather())
</script>

<template>
    <main class="page" :class="pageThemeClass">
        <header class="hero">
            <Vue3Lottie :animation-data="weatherSun" :height="56" :width="56" class="weather-lottie" />
            <p class="eyebrow">TODAY'S WEATHER</p>
            <h1>오늘의 날씨</h1>
            <p class="hero-sub">도시를 검색하거나 카드를 눌러 살펴보세요</p>
            <button class="location-btn" type="button" :disabled="isLocating" @click="addCurrentLocation">
                {{ isLocating ? '위치 확인 중…' : '⌖ 내 위치 날씨 추가' }}
            </button>
            <p v-if="locationError" class="location-error" role="alert">{{ locationError }}</p>
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
                    평균 기온 · <strong>{{ displayAverageTemp }}{{ configStore.unitSymbol }}</strong> · 즐겨찾기 {{
                        favoritesStore.favoriteCities.length }}곳
                    <button class="refresh-btn" type="button" :disabled="citiesStore.isLoading"
                        @click="citiesStore.fetchAllWeather()">
                        {{ citiesStore.isLoading ? '실시간 날씨 불러오는 중…' : '⟳ 실시간 날씨 새로고침' }}
                    </button>
                </p>
                <p v-if="citiesStore.error" class="api-error" role="alert">⚠️ {{ citiesStore.error }}</p>

                <TransitionGroup v-if="sortedFilteredList.length" name="card" tag="div" class="weather-grid">
                    <WeatherCard v-for="city in sortedFilteredList" :key="city.id" :city="city"
                        :selected-city="selectedCity" :is-favorite="favoritesStore.isFavorite(city.name)"
                        @select-card="selectCity" @click-detail="showDetail"
                        @toggle-favorite="favoritesStore.toggleFavorite" @show-temp-tip="showTempTip"
                        @show-air-tip="showAirTip" />
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

.weather-lottie {
    margin: 0 auto 6px;
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

.location-btn {
    margin-top: 16px;
    padding: 8px 14px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: var(--surface);
    color: var(--accent-cool);
    font: 700 13px inherit;
    cursor: pointer;
}

.location-btn:disabled {
    color: var(--ink-soft);
    cursor: not-allowed;
}

.location-error {
    margin: 8px 0 0;
    color: #d24a32;
    font-size: 13px;
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

.refresh-btn {
    margin-left: 10px;
    padding: 4px 12px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: var(--surface);
    color: var(--accent-cool);
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
}

.refresh-btn:disabled {
    color: var(--ink-soft);
    cursor: not-allowed;
}

.api-error {
    margin: -8px 0 16px;
    color: #d24a32;
    font-size: 13px;
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
