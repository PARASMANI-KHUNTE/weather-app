import { View, Text, StyleSheet } from 'react-native';
import { getWeatherIcon } from '../utils/icons';

interface Props {
  data: any;
}

export default function WeatherCard({ data }: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.city}>{data.name}</Text>
      <Text style={styles.temp}>{data.main.temp} °C</Text>
      <Text style={styles.desc}>
        {getWeatherIcon(data.weather[0].description)} {data.weather[0].description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
