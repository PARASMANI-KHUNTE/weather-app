import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Keyboard } from 'react-native';
import CitySuggestions from '../../components/CitySuggestions';

import WeatherCard from '../../components/WeatherCard';
import { fetchWeatherByCity, fetchWeatherByLocation } from '../../services/weatherService';

export default function WeatherScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const getWeather = async (city?: string) => {
    try {
      setLoading(true);
      const data = city
        ? await fetchWeatherByCity(city)
        : await fetchWeatherByLocation();

      if (data.cod !== 200) throw new Error(data.message);
      setWeather(data);
      setErrorMsg(null);
    } catch (err: any) {
      setErrorMsg(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const handleSearch = () => {
    if (search.trim()) {
      Keyboard.dismiss();
      getWeather(search.trim());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌦️ Weather App</Text>
      <CitySuggestions onCitySelect={(city) => getWeather(city)} />


      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
      ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : weather ? (
        <WeatherCard data={weather} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e2a38',
    paddingTop: 60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 40,
  },
});
