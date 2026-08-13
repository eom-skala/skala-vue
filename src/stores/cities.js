import { ref } from "vue";
import { defineStore } from "pinia";
import { fetchWeatherByCityName } from "../data/weather";
import { cityCatalog } from "../data/cityCatalog";

const defaultCities = [
  { id: "city_01", name: "서울", temp: 28, status: "맑음", isDefault: true },
  { id: "city_02", name: "수원", temp: 24, status: "비", isDefault: true },
  { id: "city_03", name: "부산", temp: 26, status: "구름", isDefault: true },
];

function formatClock(unixSeconds) {
  if (!unixSeconds) return "-";
  return new Date(unixSeconds * 1000).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export const useCitiesStore = defineStore("cities", () => {
  const weatherList = ref(defaultCities.map((city) => ({ ...city })));
  const isLoading = ref(false);
  const error = ref("");

  async function refreshCity(city) {
    try {
      const weather = await fetchWeatherByCityName(city.name);
      Object.assign(city, {
        temp: weather.temp,
        status: weather.status,
        description: weather.description,
        feelsLike: weather.feelsLike,
        humidity: weather.humidity,
        windSpeed: weather.windSpeed,
        precipitation: weather.precipitation,
        icon: weather.icon,
        sunrise: formatClock(weather.sunrise),
        sunset: formatClock(weather.sunset),
        updatedAt: formatClock(Math.floor(Date.now() / 1000)),
      });
      return { ok: true };
    } catch (err) {
      console.error(`[OpenWeatherMap] ${city.name} 날씨 조회 실패:`, err);
      return { ok: false, message: `${city.name}의 실시간 날씨를 가져오지 못했습니다.` };
    }
  }

  async function fetchAllWeather() {
    isLoading.value = true;
    error.value = "";

    const results = await Promise.all(weatherList.value.map((city) => refreshCity(city)));
    const failedMessages = results.filter((result) => !result.ok).map((result) => result.message);
    error.value = failedMessages.join(" ");

    isLoading.value = false;
  }

  function pickRandomCityNames(count = 10) {
    const registeredNames = new Set(weatherList.value.map((city) => city.name));
    const candidates = cityCatalog.filter((name) => !registeredNames.has(name));

    const shuffled = [...candidates].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  async function addCityByName(name) {
    const normalizedName = name.trim();

    if (!normalizedName) return { ok: false, message: "도시를 선택해 주세요." };
    if (weatherList.value.some((city) => city.name === normalizedName)) {
      return { ok: false, message: "이미 등록된 도시입니다." };
    }

    const newCity = {
      id: `city_${Date.now()}`,
      name: normalizedName,
      temp: 0,
      status: "맑음",
      isDefault: false,
    };
    weatherList.value.push(newCity);

    const result = await refreshCity(newCity);
    if (!result.ok) {
      weatherList.value = weatherList.value.filter((city) => city.id !== newCity.id);
    }
    return result;
  }

  function removeCity(cityId) {
    const city = weatherList.value.find((item) => item.id === cityId);
    if (!city || city.isDefault) return null;

    weatherList.value = weatherList.value.filter((item) => item.id !== cityId);
    return city;
  }

  return {
    weatherList,
    isLoading,
    error,
    fetchAllWeather,
    refreshCity,
    pickRandomCityNames,
    addCityByName,
    removeCity,
  };
});
