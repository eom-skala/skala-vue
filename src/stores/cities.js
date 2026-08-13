import { ref } from 'vue'
import { defineStore } from 'pinia'

const defaultCities = [
  { id: 'city_01', name: '서울', temp: 28, status: '맑음', isDefault: true },
  { id: 'city_02', name: '수원', temp: 24, status: '비', isDefault: true },
  { id: 'city_03', name: '부산', temp: 26, status: '구름', isDefault: true },
]

export const useCitiesStore = defineStore('cities', () => {
  const weatherList = ref(defaultCities.map((city) => ({ ...city })))

  function addCity({ name, temp, status }) {
    const normalizedName = name.trim()
    const temperature = Number(temp)

    if (!normalizedName) return { ok: false, message: '도시 이름을 입력해 주세요.' }
    if (weatherList.value.some((city) => city.name === normalizedName)) {
      return { ok: false, message: '이미 등록된 도시입니다.' }
    }
    if (!Number.isFinite(temperature) || temperature < -50 || temperature > 60) {
      return { ok: false, message: '기온은 -50°C부터 60°C 사이로 입력해 주세요.' }
    }

    weatherList.value.push({
      id: `city_${Date.now()}`,
      name: normalizedName,
      temp: temperature,
      status,
      isDefault: false,
    })
    return { ok: true }
  }

  function removeCity(cityId) {
    const city = weatherList.value.find((item) => item.id === cityId)
    if (!city || city.isDefault) return null

    weatherList.value = weatherList.value.filter((item) => item.id !== cityId)
    return city
  }

  return { weatherList, addCity, removeCity }
})
