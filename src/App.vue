<script setup>
import SampleOne from './components/practices/basic/SampleOne.vue'
import SampleTwo from './components/practices/basic/SampleTwo.vue'
import StyleBinding from './components/practices/basic/StyleBinding.vue'
import ClassBinding from './components/practices/basic/ClassBinding.vue'
import VBindShorthand from './components/practices/basic/v-bind_shorthand.vue'
import VBindDirective from './components/practices/basic/v-bind_directive.vue'
import VHtml from './components/practices/basic/v-html.vue'
import VText from './components/practices/basic/v-text.vue'
import XSS from './components/practices/basic/xss.vue'
import VIf from './components/practices/basic/v-if.vue'
import VFor from './components/practices/basic/v-for.vue'
import VShow from './components/practices/basic/v-show.vue'
import VPre from './components/practices/basic/v-pre.vue'
import VOnce from './components/practices/basic/v-once.vue'
import VMemo from './components/practices/basic/v-memo.vue'
import VCloak from './components/practices/basic/v-cloak.vue'
import VOn from './components/practices/basic/v-on.vue'
import EventObject from './components/practices/basic/EventObject.vue'
import EventModifier from './components/practices/basic/EventModifier.vue'
import TwoWayDataBinding from './components/practices/basic/TwoWayDataBinding.vue'
import FormDataBinding from './components/practices/basic/FormDataBinding.vue'
import Modifer from './components/practices/basic/Modifier.vue'
import VueStyleExample from './components/practices/basic/VueStyleExample.vue'
import Practice1 from './components/practices/Handson/Practice1.vue'
import Practice2 from './components/practices/Handson/Practice2.vue'
import ref from "./components/practices/basic/ref.vue"
import reactive from "./components/practices/basic/reactive.vue"
import Computed from "./components/practices/basic/computed.vue"
import Watch from "./components/practices/basic/watch.vue"
import MultiSourceWatch from "./components/practices/basic/MultiSourceWatch.vue"
import DeepWatch from "./components/practices/basic/DeepWatch.vue"
import WatchReactive from "./components/practices/basic/WatchReactive.vue"
import WatchEffect from "./components/practices/basic/WatchEffect.vue"
import LifeCycleHook from './components/practices/basic/LifeCycleHook.vue'
import PropsEmitsChild from './components/practices/basic/PropsEmitsChild.vue'
import PropsEmitsParent from './components/practices/basic/PropsEmitsParent.vue'
import SlotDefaultChild from './components/practices/basic/SlotDefaultChild.vue'
import SlotDefaultParent from './components/practices/basic/SlotDefaultParent.vue'
import SlotNamedChild from './components/practices/basic/SlotNamedChild.vue'
import SlotNamedParent from './components/practices/basic/SlotNamedParent.vue'
import SlotScopedChild from './components/practices/basic/SlotScopedChild.vue'
import SlotScopedParent from './components/practices/basic/SlotScopedParent.vue'
import AxiosJson from './components/practices/basic/AxiosJson.vue'
import AxiosWeather from './components/practices/basic/AxiosWeather.vue'

import WeatherParent from './components/exercise/WeatherParent.vue'
import UnitToggler from './components/exercise/UnitToggler.vue'
import { useConfigStore } from './stores/configStore'
import { useCitiesStore } from './stores/cities'
import { onMounted } from 'vue'
import { Axios } from 'axios'

const configStore = useConfigStore()
const citiesStore = useCitiesStore()

onMounted(() => {
  citiesStore.fetchAllWeather()
})


// import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView /> -->
  <!-- <SampleOne />
    <hr>
    <SampleTwo />
    <hr>
    <VHtml />
    <hr>
    <XSS />
    <hr>
    <VText />
    <hr>
    <VBindDirective />
    <hr>
    <ClassBinding />
    <hr>
    <StyleBinding />
    <hr>
    <VBindShorthand />
    <hr>
    <VIf />
    <hr>
    <VShow />
    <hr>
    <VFor />
    <hr>
    <VPre />
    <hr>
    <VCloak />
    <hr>
    <VOnce />
    <hr>
    <VMemo />
    <hr>
    <VOn />
    <hr>
    <EventObject />
    <hr>
    <EventModifier />
    <hr>
    <TwoWayDataBinding />
    <hr>
    <FormDataBinding />
    <hr>
    <Modifer />
    <hr>
    <VueStyleExample />
    <hr>
    <ref />
    <hr>
    <reactive />
    <hr>
    <Computed />
    <hr>
    <Watch />
    <hr>
    <MultiSourceWatch />
    <hr>
    <DeepWatch />
    <hr>
    <WatchReactive />
    <hr>
    <WatchEffect />
    <hr>
    <LifeCycleHook /> -->
  <!-- <PropsEmitsParent />
    <hr>
    <SlotDefaultParent />
    <hr>
    <SlotNamedParent />
    <hr>
    <SlotScopedParent /> -->
  <!-- <Practice2 /> -->
  <!-- <WeatherParent /> -->
  <!-- <AxiosJson /> -->
  <!-- <AxiosWeather /> -->
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

<!-- <style scoped>
/* hr {
  margin: 30px 0;
} */
</style> -->

<!-- <style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
