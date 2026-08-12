<script setup>

import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="page">
    <p class="eyebrow">ABOUT</p>
    <h1>오늘의 날씨</h1>
    <p class="lead">
      도시별 현재 날씨를 검색하고, 카드를 선택해 페이지 배경과 온도별 팁을 확인하고,
      즐겨찾기한 도시를 관리할 수 있는 날씨 대시보드입니다.
    </p>

    <div class="feature-list">
      <div class="feature-item">
        <span class="feature-icon">🔍</span>
        <p>도시 이름으로 검색하고 이름순/온도순으로 정렬해 볼 수 있어요.</p>
      </div>
      <div class="feature-item">
        <span class="feature-icon">⭐</span>
        <p>마음에 드는 도시는 즐겨찾기에 추가해 따로 관리할 수 있어요.</p>
      </div>
      <div class="feature-item">
        <span class="feature-icon">📄</span>
        <p>카드의 "상세보기"를 누르면 해당 도시의 상세 기상관측 페이지로 이동해요.</p>
      </div>
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
  margin: 0 0 16px;
  font-size: 34px;
}

.lead {
  max-width: 480px;
  margin: 0 auto 36px;
  color: #5b6478;
  line-height: 1.6;
}

.feature-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
  max-width: 420px;
  margin: 0 auto;
  text-align: left;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 16px;
  border: 1px solid #dce3ed;
  border-radius: 14px;
  background: #ffffff;
}

.feature-item p {
  margin: 0;
  font-size: 14px;
  color: #5b6478;
}

.feature-icon {
  flex-shrink: 0;
  font-size: 20px;
}

.back-link {
  display: inline-block;
  margin-top: 36px;
  color: #3e8ed8;
  text-decoration: none;
  font-weight: 600;
}

.back-link:hover {
  text-decoration: underline;
}
</style>