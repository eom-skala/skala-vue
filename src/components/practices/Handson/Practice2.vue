<script setup>
/* ============================================================
   1. 반응형 상태 관리 (searchQuery, selectedCityInfo, weatherList)
   ============================================================ */
import { ref, computed, watch, watchEffect } from 'vue'

// 지역별 날씨 데이터 (반응형 배열)
const weatherList = ref([
    { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
    { id: 'city_02', name: '수원', temp: 24, status: '비' },
    { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

// 검색어
const searchQuery = ref('')
// 선택된 도시명
const selectedCityInfo = ref('')
// 카드 정렬 기준 ('name' | 'temp')
const sortOrder = ref('name')

/* ------------------------------------------------------------
   [본인 추가] 5. 나만의 반응형 상태: 즐겨찾기 도시 목록
   - 별표 버튼을 눌러 즐겨찾기 도시를 추가/삭제
   ------------------------------------------------------------ */
const favoriteCities = ref([])

// [본인 추가] 온도 클릭 시 하단에 보여줄 팁 상태 (도시명 + 팁 문구)
const tempTipCity = ref('')
const tempTip = ref('')

const selectCity = (cityName) => {
    selectedCityInfo.value = cityName
}

const showDetail = (cityName, status) => {
    window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}

const statusIcon = (status) => {
    const icons = { 맑음: '☀️', 비: '🌧️', 구름: '☁️' }
    return icons[status] || '🌤️'
}

// [본인 추가] 선택된 도시의 날씨 상태에 맞는 테마 클래스 반환 (page 배경에 사용)
const weatherThemeClass = (status) => {
    const themes = { 맑음: 'theme-sunny', 비: 'theme-rain', 구름: 'theme-cloud' }
    return themes[status] || 'theme-default'
}

// [본인 추가] 현재 선택된 도시 객체를 찾아 page 배경 테마 클래스로 변환
const pageThemeClass = computed(() => {
    if (!selectedCityInfo.value) return ''
    const city = weatherList.value.find((c) => c.name === selectedCityInfo.value)
    return city ? weatherThemeClass(city.status) : ''
})

// [본인 추가] 즐겨찾기 토글 함수
const toggleFavorite = (cityName) => {
    const idx = favoriteCities.value.indexOf(cityName)
    if (idx === -1) {
        favoriteCities.value.push(cityName)
    } else {
        favoriteCities.value.splice(idx, 1)
    }
}
const isFavorite = (cityName) => favoriteCities.value.includes(cityName)

// [본인 추가] 온도에 따른 팁 표시 함수
const showTempTip = (cityName, temp) => {
    let tip = ''
    if (temp >= 28) {
        tip = '🥵 폭염 수준이에요. 야외 활동은 자제하고 수분을 충분히 섭취하세요.'
    } else if (temp >= 25) {
        tip = '🔥 더운 날씨예요. 가볍고 통풍이 잘되는 옷차림을 추천해요.'
    } else if (temp >= 20) {
        tip = '🌤️ 활동하기 좋은 선선한 날씨예요. 얇은 겉옷 하나면 충분해요.'
    } else {
        tip = '❄️ 쌀쌀한 날씨예요. 따뜻한 겉옷을 챙기는 걸 추천해요.'
    }
    tempTipCity.value = cityName
    tempTip.value = tip
}

/* ============================================================
   2. 검색 도시 (computed 활용) → filteredWeatherList
   - 검색어가 비어있으면 원본 데이터 전체 반환
   - 검색어가 있으면 도시 이름에 포함된 항목만 필터링
   ============================================================ */
const filteredWeatherList = computed(() => {
    if (searchQuery.value.trim() === '') return weatherList.value
    return weatherList.value.filter((city) => city.name.includes(searchQuery.value))
})

// 필터링된 결과를 정렬 기준(이름순/온도순)에 따라 다시 정렬
const sortedFilteredList = computed(() => {
    const list = [...filteredWeatherList.value]
    if (sortOrder.value === 'temp') return list.sort((a, b) => b.temp - a.temp)
    return list.sort((a, b) => a.name.localeCompare(b.name))
})

/* ------------------------------------------------------------
   [본인 추가] 5. 나만의 computed: 필터링된 도시들의 평균 기온
   ------------------------------------------------------------ */
const averageTemp = computed(() => {
    const list = filteredWeatherList.value
    if (list.length === 0) return 0
    const sum = list.reduce((acc, city) => acc + city.temp, 0)
    return Math.round((sum / list.length) * 10) / 10
})

/* ============================================================
   3. 반응형 변수 변화 감시 (watch, watchEffect)
   ============================================================ */

// selectedCityInfo 감시 (watch) → 상태바 문구가 바뀔 때마다 콘솔 로그
watch(selectedCityInfo, (newValue, oldValue) => {
    console.log(`[watch] selectedCityInfo 변경: ${oldValue} → ${newValue}`)
})

// searchQuery 감시 (watchEffect) → 타이핑할 때마다 검색어 추적 로그
watchEffect(() => {
    console.log(`[watchEffect] 현재 검색어: "${searchQuery.value}"`)
})

// (기존 요구사항 외 참고용) 정렬 기준 변경 감시
watch(sortOrder, (newValue, oldValue) => {
    console.log(`[watch] 정렬 기준 변경: ${oldValue} → ${newValue}`)
})

/* ------------------------------------------------------------
   [본인 추가] 5. 나만의 watcher: 즐겨찾기 목록 변경 감시
   - deep 옵션으로 배열 내부 변화까지 감지
   ------------------------------------------------------------ */
watch(
    favoriteCities,
    (newList) => {
        console.log(`[watch] 즐겨찾기 목록 변경 (총 ${newList.length}개):`, newList)
    },
    { deep: true }
)
</script>

<template>
    <div class="page" :class="pageThemeClass">
        <header class="hero">
            <p class="skala">SKALA</p>
            <p class="eyebrow">TODAY'S WEATHER</p>
            <h1>오늘의 날씨</h1>
            <p class="hero-sub">도시를 검색하거나 카드를 눌러 살펴보세요</p>
        </header>

        <section class="search-city">
            <label class="field-label" for="city-search">도시 검색</label>
            <div class="input-wrap">
                <span class="input-icon">⌕</span>
                <input id="city-search" type="text" :value="searchQuery" @input="(e) => (searchQuery = e.target.value)"
                    placeholder="검색할 도시 이름 입력" />
            </div>
            <p class="query-readout" v-if="searchQuery">검색 중 · <strong>{{ searchQuery }}</strong></p>
        </section>

        <section class="weather-section">
            <div class="list-header">
                <h2>지역별 날씨 현황</h2>
                <div class="sort-toggle" role="group" aria-label="정렬 기준">
                    <button :class="{ active: sortOrder === 'name' }" @click="sortOrder = 'name'">이름순</button>
                    <button :class="{ active: sortOrder === 'temp' }" @click="sortOrder = 'temp'">온도순</button>
                </div>
            </div>

            <!-- [본인 추가] 필터링된 도시들의 평균 기온 표시 -->
            <p v-if="sortedFilteredList.length > 0" class="avg-readout">
                평균 기온 · <strong>{{ averageTemp }}°C</strong>
                · 즐겨찾기 {{ favoriteCities.length }}곳
            </p>

            <!-- 4. 검색 결과 표시: 검색어 없음/일치 있음/일치 없음 3가지 상태 분기 -->
            <transition-group v-if="sortedFilteredList.length > 0" name="card" tag="div" class="weather-grid">
                <article v-for="city in sortedFilteredList" :key="city.id" class="weather-card"
                    :class="{ selected: selectedCityInfo === city.name }" @click="selectCity(city.name)">
                    <div class="card-top">
                        <div class="place">
                            <span class="icon">{{ statusIcon(city.status) }}</span>
                            <div>
                                <h3>{{ city.name }}</h3>
                                <span class="status-text">{{ city.status }}</span>
                            </div>
                        </div>
                        <button class="detail-btn" @click.stop="showDetail(city.name, city.status)">상세보기</button>
                    </div>
                    <div class="temp-readout">
                        <span class="temp-number">{{ city.temp }}</span>
                        <span class="temp-unit">°C</span>
                    </div>
                    <div class="temp-status" :class="city.temp >= 25 ? 'hot' : 'cool'"
                        @click.stop="showTempTip(city.name, city.temp)">
                        <span v-if="city.temp >= 25">🔥 더움 · 25도 이상</span>
                        <span v-else>❄️ 선선함 · 25도 미만</span>
                    </div>

                    <!-- [본인 추가] 즐겨찾기 버튼: 카드 오른쪽 아래 고정 -->
                    <button class="fav-btn" :class="{ active: isFavorite(city.name) }"
                        @click.stop="toggleFavorite(city.name)">
                        {{ isFavorite(city.name) ? '★' : '☆' }}
                    </button>
                </article>
            </transition-group>

            <!-- 검색어와 일치하는 데이터가 없을 때 안내 -->
            <div v-else class="no-result">
                <p class="no-result-icon">🔍</p>
                <p>검색 결과와 일치하는 도시가 없습니다.</p>
            </div>
        </section>

        <!-- [수정] status-bar + tip-bar를 하나의 피드백 패널로 통합 -->
        <footer class="feedback-panel" :class="{ active: selectedCityInfo }">
            <div class="feedback-status">
                <p v-if="selectedCityInfo"><strong>{{ selectedCityInfo }}</strong>이 선택되었습니다.</p>
                <p v-else>카드를 클릭하거나 검색해보세요.</p>
            </div>

            <transition name="tip">
                <div v-if="tempTip" class="feedback-tip">
                    <span class="tip-city">{{ tempTipCity }}</span>
                    <span class="tip-text">{{ tempTip }}</span>
                </div>
            </transition>
        </footer>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;700;900&display=swap');

* {
    box-sizing: border-box;
}

.page {
    --bg: #eef2f7;
    --surface: #ffffff;
    --ink: #1c2333;
    --ink-soft: #5b6478;
    --line: #dce3ed;
    --accent-hot: #ff6b4a;
    --accent-hot-soft: #fff0ec;
    --accent-cool: #3e8ed8;
    --accent-cool-soft: #eaf4fc;

    width: 100%;
    min-height: 100vh;
    background: var(--bg);
    color: var(--ink);
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
    padding: 48px 24px 64px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: background 0.5s ease;
}

/* [본인 추가] 선택된 도시의 날씨 상태에 따라 페이지 전체 배경 변경 */
.page.theme-sunny {
    background: linear-gradient(160deg, #fff8e1 0%, #ffe19a 100%);
}

.page.theme-rain {
    background: linear-gradient(160deg, #eaf4fc 0%, #bcdcf2 100%);
}

.page.theme-cloud {
    background: linear-gradient(160deg, #f4f6fa 0%, #d3dbe6 100%);
}

.hero {
    width: 100%;
    max-width: 760px;
    text-align: center;
    margin-bottom: 36px;
}

.skala {
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 1000;
    letter-spacing: 4px;
    color: #000000;
    margin: 0 0 50px;
}

.eyebrow {
    font-family: 'Outfit', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 4px;
    color: var(--accent-cool);
    margin: 0 0 10px;
}

.hero h1 {
    font-size: 40px;
    font-weight: 900;
    letter-spacing: -1px;
    margin: 0 0 8px;
}

.hero-sub {
    color: var(--ink-soft);
    font-size: 14px;
    margin: 0;
}

.search-city {
    width: 100%;
    max-width: 520px;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 16px;
    padding: 18px 20px;
    margin-bottom: 32px;
    box-shadow: 0 1px 2px rgba(28, 35, 51, 0.04);
}

.field-label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    color: var(--ink-soft);
    letter-spacing: 0.5px;
    margin-bottom: 8px;
}

.input-wrap {
    position: relative;
    display: flex;
    align-items: center;
}

.input-icon {
    position: absolute;
    left: 14px;
    color: var(--ink-soft);
    font-size: 16px;
    pointer-events: none;
}

.search-city input {
    width: 100%;
    padding: 12px 14px 12px 38px;
    border-radius: 10px;
    border: 1px solid var(--line);
    background: var(--bg);
    font-family: inherit;
    font-size: 14px;
    color: var(--ink);
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
}

.search-city input:focus {
    border-color: var(--accent-cool);
    box-shadow: 0 0 0 3px var(--accent-cool-soft);
}

.query-readout {
    margin: 10px 0 0;
    font-size: 13px;
    color: var(--ink-soft);
}

.query-readout strong {
    color: var(--ink);
}

.weather-section {
    width: 100%;
    max-width: 900px;
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
    font-size: 18px;
    font-weight: 700;
    margin: 0;
}

.avg-readout {
    margin: 0 0 16px;
    font-size: 13px;
    color: var(--ink-soft);
}

.avg-readout strong {
    color: var(--ink);
}

.sort-toggle {
    display: inline-flex;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 999px;
    padding: 3px;
    gap: 2px;
}

.sort-toggle button {
    border: none;
    background: transparent;
    padding: 6px 16px;
    border-radius: 999px;
    font-family: inherit;
    font-size: 13px;
    font-weight: 500;
    color: var(--ink-soft);
    cursor: pointer;
    transition: background 0.15s, color 0.15s;
}

.sort-toggle button.active {
    background: var(--ink);
    color: #ffffff;
    font-weight: 700;
}

.weather-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
}

.weather-card {
    position: relative;
    background: var(--surface);
    border: 1px solid var(--line);
    border-radius: 18px;
    padding: 20px 20px 56px;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease, background 0.25s ease;
}

.weather-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 24px rgba(28, 35, 51, 0.08);
    border-color: transparent;
}

.weather-card.selected {
    border-color: var(--accent-cool);
    box-shadow: 0 0 0 3px var(--accent-cool-soft);
}

.card-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 18px;
    gap: 8px;
}

.place {
    display: flex;
    align-items: center;
    gap: 10px;
}

.place .icon {
    font-size: 26px;
    line-height: 1;
}

.place h3 {
    margin: 0;
    font-size: 17px;
    font-weight: 700;
}

.status-text {
    font-size: 12px;
    color: var(--ink-soft);
}

.fav-btn {
    position: absolute;
    right: 16px;
    bottom: 16px;
    border: none;
    background: var(--surface);
    color: #c9cfdb;
    width: 34px;
    height: 34px;
    border-radius: 999px;
    font-size: 17px;
    line-height: 1;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 8px rgba(28, 35, 51, 0.12);
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.15s, background 0.2s, box-shadow 0.2s;
}

.fav-btn:hover {
    transform: scale(1.12) rotate(-8deg);
    color: #f2c94c;
}

.fav-btn.active {
    background: linear-gradient(135deg, #ffd76a, #ffb020);
    color: #ffffff;
    box-shadow: 0 4px 14px rgba(255, 176, 32, 0.45);
    animation: fav-pop 0.35s ease;
}

.fav-btn.active:hover {
    transform: scale(1.12);
}

@keyframes fav-pop {
    0% {
        transform: scale(0.6);
    }

    60% {
        transform: scale(1.25);
    }

    100% {
        transform: scale(1);
    }
}

.detail-btn {
    flex-shrink: 0;
    padding: 6px 12px;
    border-radius: 999px;
    background: var(--bg);
    color: var(--ink);
    border: 1px solid var(--line);
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.15s;
}

.detail-btn:hover {
    background: var(--line);
}

.temp-readout {
    font-family: 'Outfit', sans-serif;
    display: flex;
    align-items: flex-start;
    gap: 2px;
    margin-bottom: 14px;
}

.temp-number {
    font-size: 44px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: -1px;
}

.temp-unit {
    font-size: 16px;
    font-weight: 500;
    color: var(--ink-soft);
    margin-top: 4px;
}

.temp-status {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.15s ease, box-shadow 0.15s ease;
}

.temp-status:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(28, 35, 51, 0.12);
}

.temp-status.hot {
    background: var(--accent-hot-soft);
    color: var(--accent-hot);
}

.temp-status.cool {
    background: var(--accent-cool-soft);
    color: var(--accent-cool);
}

.no-result {
    text-align: center;
    padding: 60px 20px;
    color: var(--ink-soft);
    background: var(--surface);
    border: 1px dashed var(--line);
    border-radius: 18px;
}

.no-result-icon {
    font-size: 28px;
    margin: 0 0 8px;
}

/* [수정] status-bar + tip-bar를 하나의 카드로 통합 */
.feedback-panel {
    width: 100%;
    max-width: 900px;
    margin-top: 24px;
    border-radius: 14px;
    background: var(--surface);
    border: 1px solid var(--line);
    overflow: hidden;
    transition: background 0.2s, border-color 0.2s;
}

.feedback-status {
    padding: 16px 20px;
    color: var(--ink-soft);
    text-align: center;
    font-size: 14px;
    transition: background 0.2s, color 0.2s;
}

.feedback-panel.active .feedback-status {
    background: var(--ink);
    color: #ffffff;
}

.feedback-panel.active .feedback-status strong {
    color: #ffffff;
}

/* [본인 추가] temp-status 클릭 시 나타나는 팁 섹션 (같은 패널 하단) */
.feedback-tip {
    padding: 14px 20px;
    background: linear-gradient(135deg, #eaf4fc, #fff7e0);
    border-top: 1px solid var(--line);
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13px;
    color: var(--ink);
}

.tip-city {
    flex-shrink: 0;
    padding: 3px 10px;
    border-radius: 999px;
    background: var(--ink);
    color: #ffffff;
    font-size: 12px;
    font-weight: 700;
}

.tip-text {
    color: var(--ink-soft);
}

.tip-enter-active,
.tip-leave-active {
    transition: all 0.25s ease;
}

.tip-enter-from,
.tip-leave-to {
    opacity: 0;
    transform: translateY(-6px);
}

.card-move,
.card-enter-active,
.card-leave-active {
    transition: all 0.25s ease;
}

.card-enter-from,
.card-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

.card-leave-active {
    position: absolute;
}
</style>