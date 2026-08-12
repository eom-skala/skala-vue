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
import WeatherParent from './components/practices/weather/WeatherParent.vue'


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
  <div style="padding: 20px">
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
    <WeatherParent />
  </div>
</template>

<style scoped>
/* hr {
  margin: 30px 0;
} */
</style>

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
