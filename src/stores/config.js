import { ref } from "vue";
import { defineStore } from "pinia";

export const useConfigStore = defineStore("config", () => {
  const unit = ref("celsius");

  function toggleUnit() {
    unit.value = unit.value === "celsius" ? "fahrenheit" : "celsius";
  }

  function setUnit(nextUnit) {
    unit.value = nextUnit;
  }

  return { unit, toggleUnit, setUnit };
});
