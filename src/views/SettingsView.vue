<script setup>

import { RouterLink } from 'vue-router'
import UnitToggler from '../components/exercise/UnitToggler.vue'
import { useConfigStore } from '../stores/config'

const configStore = useConfigStore()
</script>

<template>
    <section class="page">
        <p class="eyebrow">SETTINGS</p>
        <h1>설정</h1>
        <p class="lead">대시보드 전반에 적용되는 표시 옵션을 관리합니다.</p>

        <div class="setting-card">
            <div class="setting-row">
                <div class="setting-text">
                    <h2>온도 단위</h2>
                    <p>메인 대시보드와 상세 페이지에 표시되는 온도 단위를 선택하세요.</p>
                </div>
                <UnitToggler />
            </div>
            <p class="current-value">
                현재 단위 · <strong>{{ configStore.unit === 'fahrenheit' ? '화씨 (°F)' : '섭씨 (°C)' }}</strong>
            </p>
        </div>

        <RouterLink class="back-link" to="/">← 메인 대시보드로 돌아가기</RouterLink>
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

.page h1 {
    margin: 0 0 12px;
    font-size: 34px;
}

.lead {
    max-width: 420px;
    margin: 0 auto 32px;
    color: #5b6478;
}

.setting-card {
    max-width: 480px;
    margin: 0 auto;
    padding: 20px 24px;
    border: 1px solid #dce3ed;
    border-radius: 16px;
    background: #ffffff;
    text-align: left;
}

.setting-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
}

.setting-text h2 {
    margin: 0 0 4px;
    font-size: 16px;
}

.setting-text p {
    margin: 0;
    font-size: 13px;
    color: #5b6478;
}

.current-value {
    margin: 16px 0 0;
    padding-top: 16px;
    border-top: 1px solid #dce3ed;
    font-size: 13px;
    color: #5b6478;
}

.current-value strong {
    color: #1c2333;
}

.back-link {
    display: inline-block;
    margin-top: 32px;
    color: #3e8ed8;
    text-decoration: none;
    font-weight: 600;
}

.back-link:hover {
    text-decoration: underline;
}
</style>