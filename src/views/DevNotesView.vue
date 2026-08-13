<script setup>
import { computed } from 'vue'
import { marked } from 'marked'
import readmeRaw from '../../README.md?raw'

const readmeHtml = computed(() => marked.parse(readmeRaw))
</script>

<template>
  <main class="page">
    <header class="hero">
      <p class="eyebrow">DEV NOTES</p>
      <h1>개발 노트</h1>
      <p class="hero-sub">프로젝트 README.md 내용을 그대로 보여줍니다.</p>
    </header>

    <article class="readme-card markdown-body" v-html="readmeHtml"></article>
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

.readme-card {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 36px;
  border: 1px solid #dce3ed;
  border-radius: 18px;
  background: #fff;
  line-height: 1.7;
  word-break: break-word;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3) {
  margin: 28px 0 12px;
  line-height: 1.3;
  color: #1c2333;
}

.markdown-body :deep(h1) {
  font-size: 26px;
  padding-bottom: 8px;
  border-bottom: 1px solid #dce3ed;
}

.markdown-body :deep(h2) {
  font-size: 21px;
  padding-bottom: 6px;
  border-bottom: 1px solid #eef2f7;
}

.markdown-body :deep(h3) {
  font-size: 17px;
}

.markdown-body :deep(p) {
  margin: 10px 0;
  color: #333c4d;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin: 10px 0;
  padding-left: 22px;
  color: #333c4d;
}

.markdown-body :deep(li) {
  margin: 4px 0;
}

.markdown-body :deep(a) {
  color: #3e8ed8;
  text-decoration: none;
}

.markdown-body :deep(a:hover) {
  text-decoration: underline;
}

.markdown-body :deep(code) {
  padding: 2px 6px;
  border-radius: 6px;
  background: #eef2f7;
  font-size: 13px;
  color: #d24a32;
}

.markdown-body :deep(pre) {
  margin: 14px 0;
  padding: 16px;
  border-radius: 12px;
  background: #1c2333;
  overflow-x: auto;
}

.markdown-body :deep(pre code) {
  padding: 0;
  background: transparent;
  color: #eef2f7;
}

.markdown-body :deep(table) {
  width: 100%;
  margin: 14px 0;
  border-collapse: collapse;
  font-size: 14px;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  padding: 8px 12px;
  border: 1px solid #dce3ed;
  text-align: left;
}

.markdown-body :deep(th) {
  background: #eef2f7;
}

.markdown-body :deep(hr) {
  margin: 28px 0;
  border: 0;
  border-top: 1px solid #dce3ed;
}

.markdown-body :deep(blockquote) {
  margin: 14px 0;
  padding: 8px 16px;
  border-left: 3px solid #3e8ed8;
  background: #eaf4fc;
  color: #5b6478;
}

@media (max-width: 700px) {
  .page {
    padding: 32px 16px 48px;
  }

  .hero h1 {
    font-size: 32px;
  }

  .readme-card {
    padding: 24px 18px;
  }
}
</style>
