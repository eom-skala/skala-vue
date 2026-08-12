<script setup>
import { ref } from 'vue'

const weatherList = ref([
    { id: 'city_01', name: '서울', temp: 28, status: '맑음' },
    { id: 'city_02', name: '수원', temp: 24, status: '비' },
    { id: 'city_03', name: '부산', temp: 26, status: '구름' },
])

const searchedCity = ref('')
const selectedCity = ref('')

const selectCity = (cityName) => {
    selectedCity.value = cityName
}

const showDetail = (cityName, status) => {
    window.alert(`${cityName}의 현재 날씨는 [${status}] 상태입니다.`)
}
</script>

<template>
    <header>
        <h1>과제1: 날씨 (Mockup)</h1>
        <hr>
    </header>
    <div class="search-city">
        <h2>도시 검색</h2>
        <input type="text" :value="searchedCity" @input="(e) => (searchedCity = e.target.value)"
            placeholder="검색할 도시 이름 입력" />
        <p> 검색 중인 도시: <strong>{{ searchedCity }}</strong></p>
    </div>

    <div class="weather-list">
        <h2>지역별 날씨 현황</h2>
        <div v-for="city in weatherList" :key="city.id" class="weather-card" @click="selectCity(city.name)">
            <div class="status-title">
                <div class="status">
                    <h3>{{ city.name }}({{ city.status }})</h3>
                    <p>현재 기온: {{ city.temp }}°C</p>
                    <div class="temp-status" :class="city.temp >= 25 ? 'hot' : 'cool'">
                        <p v-if="city.temp >= 25">🔥 더움 (25도 이상)</p>
                        <p v-else>❄️ 선선함 (25도 미만)</p>
                    </div>
                </div>
                <button @click.stop="showDetail(city.name, city.status)"
                    style="padding: 5px 10px; border-radius: 5px; 
                                            background: #ffffff; color: #000000; border-color: #dddddd; border: 1px solid; cursor: pointer;">상세보기
                </button>
            </div>
        </div>
    </div>
    <div class="status-bar">
        <p v-if="selectedCity">{{ selectedCity }}이 선택되었습니다.</p>
        <p v-else>카드를 클릭하거나 검색해보세요.</p>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700;900&display=swap');

* {
    font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, sans-serif;
    box-sizing: border-box;
}

.header h1 {
    font-weight: 900;
    letter-spacing: -1px;
}


.header {
    display: flex;
    text-align: center;
    margin-bottom: 20px;
}


.search-city {
    display: grid;
    background: #cccccc91;
    padding: 10px;
    margin: 10px;
    border-radius: 5px;
}

.status-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.weather-card {
    display: space-between;
    padding: 10px;
    margin: 10px;
    background: #ffffff;
    border-radius: 5px;
}

.weather-list {
    background: #cccccc91;
    margin: 10px;
    padding: 10px;
    border-radius: 5px;
}

.temp-status {
    display: space-left;
    border-radius: 5px;
    font-size: auto;
}

.temp-status.hot {
    background: #ff7f7f;
    color: #ffffff;
}

.temp-status.cool {
    background: #7bb2ff;
    color: #ffffff;
}

.status-bar {
    background: #89ffa4;
    padding: 10px;
    margin: 10px 0;
    color: #005120;
    border-radius: 5px;
    text-align: center;
}
</style>
