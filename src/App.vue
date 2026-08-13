<script setup>
import UnitToggler from './components/exercise/UnitToggler.vue'
import { useConfigStore } from './stores/configStore'
import { useCitiesStore } from './stores/cities'
import { onMounted } from 'vue'

const configStore = useConfigStore()
const citiesStore = useCitiesStore()

onMounted(() => {
  citiesStore.fetchAllWeather()
})


</script>

<template>
  <div class="app-shell" :class="{ 'dark-mode': configStore.isDarkMode }">
    <header class="app-header">
      <div class="app-header__inner">
        <nav aria-label="주요 메뉴">
          <RouterLink to="/">날씨 대시보드</RouterLink>
          <RouterLink to="/favorites">즐겨찾기</RouterLink>
          <RouterLink to="/cities">도시 관리</RouterLink>
          <RouterLink to="/settings">설정</RouterLink>
          <RouterLink to="/dev-notes">개발 노트</RouterLink>
          <RouterLink to="/about">서비스 소개</RouterLink>
        </nav>

        <div class="app-header__side">
          <UnitToggler />
          <span class="brand">SKALA</span>
        </div>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;900&display=swap');

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #eef2f7;
}

button,
input {
  font: inherit;
}

.app-header {
  position: sticky;
  z-index: 1;
  top: 0;
  padding: 14px 24px;
  background: rgb(255 255 255 / 92%);
  border-bottom: 1px solid #dce3ed;
  backdrop-filter: blur(10px);
}

.app-header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  width: 100%;
  max-width: none;
  margin: auto;
}

.app-header nav {
  display: flex;
  align-items: center;
  gap: 18px;
}

.app-header__side {
  display: flex;
  align-items: center;
  gap: 14px;
}

.app-header a {
  color: #5b6478;
  text-decoration: none;
  font: 700 14px 'Noto Sans KR', sans-serif;
}

.app-header a.router-link-active {
  color: #3e8ed8;
}

.app-header .brand {
  position: relative;
  top: 3px;
  font: 1000 18px 'Outfit', sans-serif;
  letter-spacing: 4px;
  color: #000;
}

.app-shell {
  min-height: 100vh;
  background: #eef2f7;
  color: #1c2333;
  transition: background 0.25s ease, color 0.25s ease;
}

.app-shell.dark-mode {
  background: #151a24;
  color: #f4f7fb;
}

.app-shell.dark-mode .app-header {
  background: rgb(28 35 51 / 92%);
  border-color: #3d4758;
}

.app-shell.dark-mode .app-header a {
  color: #c9d3e0;
}

.app-shell.dark-mode .app-header a.router-link-active {
  color: #72b8f1;
}

.dark-mode .page {
  background: #151a24 !important;
  color: #f4f7fb !important;
}

.dark-mode .manage-card,
.dark-mode .city-list,
.dark-mode .setting-card,
.dark-mode .detail-item,
.dark-mode .weather-card,
.dark-mode .search-city,
.dark-mode .feedback-panel,
.dark-mode .empty-state {
  background: #222a37 !important;
  border-color: #3d4758 !important;
}

.dark-mode .hero-sub,
.dark-mode .summary,
.dark-mode .current-value,
.dark-mode .detail-item .label,
.dark-mode .place span,
.dark-mode .tip-text {
  color: #b9c4d3 !important;
}
</style>
