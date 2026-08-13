<script setup>
import { reactive, ref } from 'vue'
import { useCitiesStore } from '../stores/cities'
import { useFavoritesStore } from '../stores/favorites'

const citiesStore = useCitiesStore()
const favoritesStore = useFavoritesStore()
const form = reactive({ name: '', temp: '', status: '맑음' })
const message = ref('')

function addCity() {
  const result = citiesStore.addCity(form)
  message.value = result.message ?? ''
  if (!result.ok) return

  form.name = ''
  form.temp = ''
  form.status = '맑음'
}

function removeCity(city) {
  const removedCity = citiesStore.removeCity(city.id)
  if (removedCity) favoritesStore.removeFavorite(removedCity.name)
}
</script>

<template>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">CITY MANAGEMENT</p>
      <h1>도시 관리</h1>
      <p class="hero-sub">대시보드에 표시할 도시를 추가하거나 관리하세요.</p>
    </header>

    <section class="manage-card" aria-labelledby="add-city-title">
      <h2 id="add-city-title">새 도시 추가</h2>
      <form class="city-form" @submit.prevent="addCity">
        <label>도시 이름<input v-model="form.name" maxlength="20" placeholder="예: 제주" /></label>
        <label>현재 기온 (°C)<input v-model="form.temp" type="number" min="-50" max="60" placeholder="예: 25" /></label>
        <label>날씨 상태<select v-model="form.status"><option>맑음</option><option>비</option><option>구름</option></select></label>
        <button type="submit">도시 추가</button>
      </form>
      <p v-if="message" class="form-message" role="alert">{{ message }}</p>
    </section>

    <section class="city-list" aria-labelledby="city-list-title">
      <div class="list-header"><h2 id="city-list-title">등록된 도시 <span>{{ citiesStore.weatherList.length }}</span></h2><p>기본 도시는 삭제할 수 없습니다.</p></div>
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
.page { min-height: calc(100vh - 53px); padding: 48px 24px 64px; background: #eef2f7; color: #1c2333; font-family: 'Noto Sans KR', sans-serif; }.hero { max-width: 760px; margin: 0 auto 36px; text-align: center; }.eyebrow { margin: 0 0 10px; color: #3e8ed8; font: 600 12px 'Outfit', sans-serif; letter-spacing: 4px; }.hero h1 { margin: 0 0 8px; font-size: 40px; letter-spacing: -1px; }.hero-sub { margin: 0; color: #5b6478; font-size: 14px; }.manage-card,.city-list { max-width: 900px; margin: 0 auto 24px; padding: 24px; border: 1px solid #dce3ed; border-radius: 18px; background: #fff; }.manage-card h2,.list-header h2 { margin: 0; font-size: 18px; }.city-form { display: grid; grid-template-columns: 1.1fr 1fr 1fr auto; align-items: end; gap: 12px; margin-top: 18px; }.city-form label { display: grid; gap: 7px; color: #5b6478; font-size: 12px; font-weight: 700; }.city-form input,.city-form select { min-width: 0; padding: 11px 12px; border: 1px solid #dce3ed; border-radius: 10px; background: #eef2f7; color: #1c2333; }.city-form button,.city-list button { padding: 11px 16px; border: 0; border-radius: 10px; background: #1c2333; color: #fff; font-weight: 700; cursor: pointer; }.form-message { margin: 12px 0 0; color: #d24a32; font-size: 13px; }.list-header { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }.list-header h2 span { color: #3e8ed8; }.list-header p { margin: 0; color: #5b6478; font-size: 12px; }.city-list ul { display: grid; gap: 10px; margin: 18px 0 0; padding: 0; list-style: none; }.city-list li { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 14px 16px; border: 1px solid #dce3ed; border-radius: 12px; }.city-list li div { display: grid; gap: 3px; }.city-list strong { font-size: 16px; }.city-list span { color: #5b6478; font-size: 13px; }.city-list button { padding: 7px 12px; background: #fff0ec; color: #d24a32; font-size: 12px; }.city-list button:disabled { background: #eef2f7; color: #8f97a8; cursor: not-allowed; } @media (max-width: 700px) { .page { padding: 32px 16px 48px; }.hero h1 { font-size: 32px; }.city-form { grid-template-columns: 1fr; }.city-form button { width: 100%; } }
</style>
