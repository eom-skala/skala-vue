<script setup>
defineProps({ query: { type: String, default: '' } })
const emit = defineEmits(['update-query'])
</script>

<template>
  <div class="search-city">
    <label class="field-label" for="city-search">도시 검색</label>
    <div class="input-wrap">
      <span class="input-icon">⌕</span>
      <input id="city-search" :value="query" type="text" placeholder="검색할 도시 이름 입력"
        @input="emit('update-query', $event.target.value)" />
    </div>
    <p v-if="query" class="query-readout">검색 중 · <strong>{{ query }}</strong></p>
  </div>
</template>

<style scoped>
.search-city {
  padding: 18px 20px;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: var(--surface);
  box-shadow: 0 1px 2px rgb(28 35 51 / 4%);
}

.field-label {
  display: block;
  margin-bottom: 8px;
  color: var(--ink-soft);
  font-size: 12px;
  font-weight: 700;
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
  pointer-events: none;
}

input {
  width: 100%;
  padding: 12px 14px 12px 38px;
  outline: 0;
  border: 1px solid var(--line);
  border-radius: 10px;
  background: var(--bg);
  color: var(--ink);
}

input:focus {
  border-color: var(--accent-cool);
  box-shadow: 0 0 0 3px var(--accent-cool-soft);
}

.query-readout {
  margin: 10px 0 0;
  color: var(--ink-soft);
  font-size: 13px;
}

.query-readout strong {
  color: var(--ink);
}
</style>