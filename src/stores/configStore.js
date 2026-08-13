import { computed, ref } from "vue";
import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", () => {
  const unit = ref("celsius");
  const isDarkMode = ref(false);

  const unitSymbol = computed(() => (unit.value === "celsius" ? "℃" : "℉"));

  function toggleUnit() {
    unit.value = unit.value === "celsius" ? "fahrenheit" : "celsius";
  }

  function toggleDarkMode() {
    isDarkMode.value = !isDarkMode.value;
  }

  return {
    unit,
    isDarkMode,
    unitSymbol,
    toggleUnit,
    toggleDarkMode,
  };
});
