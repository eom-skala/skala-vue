import { ref } from "vue";
import { defineStore } from "pinia";

export const useFavoritesStore = defineStore("favorites", () => {
  const favoriteCities = ref([]);

  function toggleFavorite(cityName) {
    const index = favoriteCities.value.indexOf(cityName);
    if (index === -1) {
      favoriteCities.value.push(cityName);
    } else {
      favoriteCities.value.splice(index, 1);
    }
  }

  function isFavorite(cityName) {
    return favoriteCities.value.includes(cityName);
  }

  function removeFavorite(cityName) {
    favoriteCities.value = favoriteCities.value.filter((name) => name !== cityName);
  }

  return { favoriteCities, toggleFavorite, isFavorite, removeFavorite };
});
