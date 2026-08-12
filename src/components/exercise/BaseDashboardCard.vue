<template>
  <div class="dashboard-card">
    <section class="search-area">
      <slot name="search" />
    </section>
    <section class="weather-area">
      <slot name="weather" />
    </section>
  </div>
</template>

<style scoped>
.dashboard-card {
  width: 100%;
  max-width: 900px;
  margin: 0 auto;
}

.search-area {
  width: 100%;
  max-width: 520px;
  margin: 0 auto 32px;
}
</style>
