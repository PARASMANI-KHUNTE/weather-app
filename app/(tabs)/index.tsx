import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TextInput, Keyboard } from 'react-native';
import * as Location from 'expo-location';

const API_KEY = '8c8b3ba834b5e7f54be59bf53d0b85dd';

export default function WeatherScreen() {
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [locationQuery, setLocationQuery] = useState<string | null>(null);

  const fetchWeather = async (city: string | null = null) => {
    try {
      setLoading(true);
      let url = '';

      if (city) {
        url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Location permission denied');
          setLoading(false);
          return;
        }
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
      }

      const response = await fetch(url);
      const data = await response.json();

      if (data.cod !== 200) {
        setErrorMsg(data.message || 'Error fetching data');
        setWeather(null);
      } else {
        setWeather(data);
        setErrorMsg(null);
      }
    } catch (error) {
      setErrorMsg('Error fetching weather');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  const getWeatherIcon = (desc: string) => {
    const d = desc.toLowerCase();
    if (d.includes('cloud')) return '☁️';
    if (d.includes('rain')) return '🌧️';
    if (d.includes('clear')) return '☀️';
    if (d.includes('snow')) return '❄️';
    if (d.includes('storm')) return '⛈️';
    return '🌤️';
  };

  const handleSearch = () => {
    if (search.trim().length > 0) {
      Keyboard.dismiss();
      fetchWeather(search.trim());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌦️ Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Search city (e.g., Delhi)"
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={setSearch}
        onSubmitEditing={handleSearch}
        returnKeyType="search"
      />

      {loading ? (
        <ActivityIndicator size="large" color="#fff" style={{ marginTop: 40 }} />
      ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        weather && (
          <View style={styles.card}>
            <Text style={styles.city}>{weather.name}</Text>
            <Text style={styles.temp}>{weather.main.temp} °C</Text>
            <Text style={styles.desc}>
              {getWeatherIcon(weather.weather[0].description)} {weather.weather[0].description}
            </Text>
          </View>
        )
      )}
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
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
  },
  card: {
    marginTop: 30,
    backgroundColor: '#34495e',
    padding: 25,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  city: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f1c40f',
  },
  temp: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginVertical: 10,
  },
  desc: {
    fontSize: 20,
    color: '#ecf0f1',
    textTransform: 'capitalize',
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 40,
  },
});
