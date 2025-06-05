import * as Location from 'expo-location';

const API_KEY = '8c8b3ba834b5e7f54be59bf53d0b85dd';

export async function fetchCoordsByCity(city: string) {
  const geoRes = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`
  );
  const geoData = await geoRes.json();

  if (!geoData.length) throw new Error('City not found');
  const { lat, lon } = geoData[0];

  return { lat, lon };
}

export async function fetchForecastByCoords(lat: number, lon: number) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=metric&appid=${API_KEY}`
  );
  return await res.json();
}

// 👉 Full forecast by city name
export async function fetchForecastByCity(city: string) {
  const { lat, lon } = await fetchCoordsByCity(city);
  return await fetchForecastByCoords(lat, lon);
}

// 👉 Full forecast by current device location
export async function fetchForecastByLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') throw new Error('Location permission denied');

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  return await fetchForecastByCoords(latitude, longitude);
}
