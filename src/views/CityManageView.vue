<script setup>
import { onMounted, ref } from 'vue'
import { useCitiesStore } from '../stores/cities'
import { useFavoritesStore } from '../stores/favorites'

const citiesStore = useCitiesStore()
const favoritesStore = useFavoritesStore()

const suggestions = ref([])
const addingCity = ref('')
const message = ref('')

function rollSuggestions() {
  suggestions.value = citiesStore.pickRandomCityNames(10)
  message.value = ''
}

async function selectSuggestion(cityName) {
  addingCity.value = cityName
  message.value = ''

  const result = await citiesStore.addCityByName(cityName)
  if (!result.ok) {
    message.value = result.message
  } else {
    suggestions.value = suggestions.value.filter((name) => name !== cityName)
  }
  addingCity.value = ''
}

function removeCity(city) {
  const removedCity = citiesStore.removeCity(city.id)
  if (removedCity) favoritesStore.removeFavorite(removedCity.name)
}

onMounted(rollSuggestions)
</script>

<template>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">CITY MANAGEMENT</p>
      <h1>도시 관리</h1>
      <p class="hero-sub">추천 도시 중 하나를 선택하면 실시간 날씨와 함께 대시보드에 추가됩니다.</p>
    </header>

    <section class="manage-card" aria-labelledby="add-city-title">
      <div class="list-header">
        <h2 id="add-city-title">추천 도시</h2>
        <button type="button" class="reroll-btn" @click="rollSuggestions">🔄 다른 도시 보기</button>
      </div>

      <ul v-if="suggestions.length" class="suggestion-grid">
        <li v-for="name in suggestions" :key="name">
          <button type="button" class="suggestion-btn" :disabled="addingCity === name" @click="selectSuggestion(name)">
            {{ addingCity === name ? `${name} 조회 중…` : name }}
          </button>
        </li>
      </ul>
      <p v-else class="empty-suggestion">추천할 수 있는 도시가 더 이상 없습니다. 이미 대부분 등록하셨네요!</p>

      <p v-if="message" class="form-message" role="alert">{{ message }}</p>
    </section>

    <section class="city-list" aria-labelledby="city-list-title">
      <div class="list-header">
        <h2 id="city-list-title">등록된 도시 <span>{{ citiesStore.weatherList.length }}</span></h2>
        <p>기본 도시는 삭제할 수 없습니다.</p>
      </div>
      <ul>
        <li v-for="city in citiesStore.weatherList" :key="city.id">
          <div><strong>{{ city.name }}</strong><span>{{ city.temp }}°C · {{ city.status }}</span></div>
          <button :disabled="city.isDefault" @click="removeCity(city)">{{ city.isDefault ? '기본 도시' : '삭제' }}</button>
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;700;900&display=swap');

.page {
  min-height: calc(100vh - 53px);
  padding: 48px 24px 64px;
  background: #eef2f7;
  color: #1c2333;
  font-family: 'Noto Sans KR', sans-serif;
}

.hero {
  max-width: 760px;
  margin: 0 auto 36px;
  text-align: center;
}

.eyebrow {
  margin: 0 0 10px;
  color: #3e8ed8;
  font: 600 12px 'Outfit', sans-serif;
  letter-spacing: 4px;
}

.hero h1 {
  margin: 0 0 8px;
  font-size: 40px;
  letter-spacing: -1px;
}

.hero-sub {
  margin: 0;
  color: #5b6478;
  font-size: 14px;
}

.manage-card,
.city-list {
  max-width: 900px;
  margin: 0 auto 24px;
  padding: 24px;
  border: 1px solid #dce3ed;
  border-radius: 18px;
  background: #fff;
}

.manage-card h2,
.list-header h2 {
  margin: 0;
  font-size: 18px;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  margin-bottom: 4px;
}

.list-header h2 span {
  color: #3e8ed8;
}

.list-header p {
  margin: 0;
  color: #5b6478;
  font-size: 12px;
}

.reroll-btn {
  padding: 7px 14px;
  border: 1px solid #dce3ed;
  border-radius: 999px;
  background: #eef2f7;
  color: #3e8ed8;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.suggestion-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 10px;
  margin: 16px 0 0;
  padding: 0;
  list-style: none;
}

.suggestion-btn {
  width: 100%;
  padding: 12px;
  border: 1px solid #dce3ed;
  border-radius: 10px;
  background: #eef2f7;
  color: #1c2333;
  font-weight: 700;
  cursor: pointer;
  transition: background .15s, border-color .15s;
}

.suggestion-btn:hover:not(:disabled) {
  background: #eaf4fc;
  border-color: #3e8ed8;
}

.suggestion-btn:disabled {
  color: #8f97a8;
  cursor: not-allowed;
}

.empty-suggestion {
  margin: 16px 0 0;
  color: #5b6478;
  font-size: 13px;
}

.form-message {
  margin: 14px 0 0;
  color: #d24a32;
  font-size: 13px;
}

.city-list ul {
  display: grid;
  gap: 10px;
  margin: 18px 0 0;
  padding: 0;
  list-style: none;
}

.city-list li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 14px 16px;
  border: 1px solid #dce3ed;
  border-radius: 12px;
}

.city-list li div {
  display: grid;
  gap: 3px;
}

.city-list strong {
  font-size: 16px;
}

.city-list span {
  color: #5b6478;
  font-size: 13px;
}

.city-list button {
  padding: 7px 12px;
  border: 0;
  border-radius: 10px;
  background: #fff0ec;
  color: #d24a32;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.city-list button:disabled {
  background: #eef2f7;
  color: #8f97a8;
  cursor: not-allowed;
}

@media (max-width: 700px) {
  .page {
    padding: 32px 16px 48px;
  }

  .hero h1 {
    font-size: 32px;
  }
}
</style>