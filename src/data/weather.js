import axios from "axios";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";
const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";
const REVERSE_GEO_URL = "https://api.openweathermap.org/geo/1.0/reverse";
const AIR_POLLUTION_URL = "https://api.openweathermap.org/data/2.5/air_pollution";
const FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast";

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
  const weather = await fetchCurrentWeather(coords);
  return { ...weather, ...coords };
}

export async function reverseGeocodeCity({ lat, lon }) {
  const { data } = await axios.get(REVERSE_GEO_URL, {
    params: { lat, lon, limit: 1, appid: API_KEY },
  });

  return data[0]?.local_names?.ko ?? data[0]?.name ?? "내 위치";
}

export async function fetchAirPollution({ lat, lon }) {
  const { data } = await axios.get(AIR_POLLUTION_URL, {
    params: { lat, lon, appid: API_KEY },
  });
  const air = data.list?.[0];
  const labels = { 1: "좋음", 2: "보통", 3: "보통", 4: "나쁨", 5: "매우 나쁨" };

  return {
    aqi: air?.main?.aqi ?? null,
    label: labels[air?.main?.aqi] ?? "정보 없음",
    pm25: Math.round(air?.components?.pm2_5 ?? 0),
    pm10: Math.round(air?.components?.pm10 ?? 0),
  };
}

export async function fetchFiveDayForecast({ lat, lon }) {
  const { data } = await axios.get(FORECAST_URL, {
    params: { lat, lon, appid: API_KEY, units: "metric", lang: "kr" },
  });

  return data.list.map((item) => ({
    timestamp: item.dt,
    date: item.dt_txt.slice(0, 10),
    time: item.dt_txt.slice(11, 16),
    temp: Math.round(item.main.temp),
    tempMin: Math.round(item.main.temp_min),
    tempMax: Math.round(item.main.temp_max),
    description: item.weather[0]?.description ?? "",
    status: mapStatus(item.weather[0]?.main),
    icon: item.weather[0]?.icon ?? "",
  }));
}
