<script setup>

import { computed } from 'vue'
import { useRouter } from 'vue-router'
import WeatherCard from '../components/exercise/WeatherCard.vue'
import { useFavoritesStore } from '../stores/favorites'
import { weatherList } from '../data/WeatherList'

const router = useRouter()
const favoritesStore = useFavoritesStore()

const favoriteCityList = computed(() =>
    weatherList.filter((city) => favoritesStore.favoriteCities.includes(city.name)),
)

function showDetail(city) {
    router.push(`/weather/${city.id}`)
}

function goHome() {
    router.push('/')
}
</script>

<template>
    <main class="page">
        <header class="hero">
            <p class="eyebrow">MY FAVORITES</p>
            <h1>즐겨찾기한 도시</h1>
            <p class="hero-sub">별표를 눌러 저장해둔 도시들을 한눈에 확인하세요</p>
        </header>

        <section class="favorite-area">
            <div v-if="favoriteCityList.length" class="weather-grid">
                <WeatherCard v-for="city in favoriteCityList" :key="city.id" :city="city" :selected-city="null"
                    is-favorite @select-card="showDetail" @click-detail="showDetail"
                    @toggle-favorite="favoritesStore.toggleFavorite" />
            </div>
            <div v-else class="empty-state">
                <p class="empty-icon">☆</p>
                <p>아직 즐겨찾기한 도시가 없어요.</p>
                <button class="home-btn" @click="goHome">홈으로 가서 추가해보세요</button>
            </div>
        </section>
    </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;700;900&display=swap');

.page {
    /* [참고] WeatherCard.vue가 참조하는 CSS 변수 세트를 동일하게 정의해야
     이 화면에서도 같은 카드 디자인이 그대로 적용된다 */
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
}

.hero {
    max-width: 760px;
    margin: 0 auto 36px;
    text-align: center;
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

.hero-sub {
    margin: 0;
    color: var(--ink-soft);
    font-size: 14px;
}

.favorite-area {
    max-width: 900px;
    margin: 0 auto;
}

.weather-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 16px;
}

.empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 72px 20px;
    border: 1px dashed var(--line);
    border-radius: 18px;
    background: var(--surface);
    color: var(--ink-soft);
    text-align: center;
}

.empty-icon {
    margin: 0;
    font-size: 32px;
}

.home-btn {
    margin-top: 12px;
    padding: 8px 18px;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: var(--bg);
    color: var(--ink);
    font: 600 13px inherit;
    cursor: pointer;
    transition: background .15s;
}

.home-btn:hover {
    background: var(--line);
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
