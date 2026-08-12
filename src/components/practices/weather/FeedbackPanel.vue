<script setup>
defineProps({ selectedCityName: { type: String, default: '' }, tipCity: { type: String, default: '' }, tip: { type: String, default: '' } })
</script>

<template>
  <footer class="feedback-panel" :class="{ active: selectedCityName }">
    <div class="feedback-status">
      <p v-if="selectedCityName"><strong>{{ selectedCityName }}</strong>이 선택되었습니다.</p>
      <p v-else>카드를 클릭하거나 검색해보세요.</p>
    </div>
    <Transition name="tip">
      <div v-if="tip" class="feedback-tip"><span class="tip-city">{{ tipCity }}</span><span class="tip-text">{{ tip
      }}</span></div>
    </Transition>
  </footer>
</template>

<style scoped>
.feedback-panel {
  width: 100%;
  max-width: 900px;
  margin: 24px auto 0;
  overflow: hidden;
  border: 1px solid var(--line);
  border-radius: 14px;
  background: var(--surface);
}

.feedback-status {
  padding: 16px 20px;
  color: var(--ink-soft);
  text-align: center;
  font-size: 14px;
}

.feedback-status p {
  margin: 0;
}

.active .feedback-status {
  background: var(--ink);
  color: #fff;
}

.feedback-tip {
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 14px 20px;
  border-top: 1px solid var(--line);
  background: linear-gradient(135deg, #eaf4fc, #fff7e0);
  font-size: 13px;
}

.tip-city {
  flex-shrink: 0;
  padding: 3px 10px;
  border-radius: 999px;
  background: var(--ink);
  color: #fff;
  font-size: 12px;
  font-weight: 700;
}

.tip-text {
  color: var(--ink-soft);
}

.tip-enter-active,
.tip-leave-active {
  transition: all .25s ease;
}

.tip-enter-from,
.tip-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
