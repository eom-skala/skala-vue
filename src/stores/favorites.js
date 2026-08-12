import { ref } from "vue";
import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", () => {
  const favoriteCities = ref([]);

  function toggleFavorite(cityName) {
    const index = favoriteCities.value.indexOf(cityName);
    index === -1 ? favoriteCities.value.push(cityName) : favoriteCities.value.splice(index, 1);
  }

  function isFavorite(cityName) {
    return favoriteCities.value.includes(cityName);
  }

  return { favoriteCities, toggleFavorite, isFavorite };
});
