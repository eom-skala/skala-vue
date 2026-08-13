import axios from "axios";

const API_KEY = "bb2a06df5df5f328666f57effe3c119a";

const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

const WEATHER_MAIN_TO_STATUS = {
  Clear: "맑음",
  Clouds: "구름",
  Rain: "비",
  Drizzle: "비",
  Thunderstorm: "비",
  Snow: "눈",
  Mist: "흐림",
  Fog: "흐림",
  Haze: "흐림",
  Smoke: "흐림",
  Dust: "흐림",
};

function mapStatus(main) {
  return WEATHER_MAIN_TO_STATUS[main] ?? "흐림";
}

/**
 * @param {string} cityName
 */
export async function geocodeCity(cityName) {
  const { data } = await axios.get(GEO_URL, {
    params: { q: `${cityName},KR`, limit: 1, appid: API_KEY },
  });

  if (!data.length) {
    throw new Error(`"${cityName}"의 위치 정보를 찾을 수 없습니다.`);
  }

  return { lat: data[0].lat, lon: data[0].lon };
}

/**
 * @param {{lat: number, lon: number}} coords
 */
export async function fetchCurrentWeather({ lat, lon }) {
  const { data } = await axios.get(WEATHER_URL, {
    params: { lat, lon, appid: API_KEY, units: "metric", lang: "kr" },
  });

  return {
    temp: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    humidity: data.main.humidity,
    windSpeed: data.wind?.speed ?? 0,
    precipitation: data.rain?.["1h"] ?? data.snow?.["1h"] ?? 0,
    status: mapStatus(data.weather[0].main),
    description: data.weather[0].description,
    icon: data.weather[0].icon,
    sunrise: data.sys.sunrise,
    sunset: data.sys.sunset,
  };
}

/**
 * @param {string} cityName
 */
export async function fetchWeatherByCityName(cityName) {
  const coords = await geocodeCity(cityName);
  return fetchCurrentWeather(coords);
}
