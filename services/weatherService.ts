import * as Location from 'expo-location';

const API_KEY = '8c8b3ba834b5e7f54be59bf53d0b85dd';

export async function fetchWeatherByCity(city: string) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return await res.json();
}

export async function fetchWeatherByLocation() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') throw new Error('Location permission denied');

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  );
  return await res.json();
}
