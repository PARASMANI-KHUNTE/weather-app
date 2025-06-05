import { FlatList, Text, View, StyleSheet } from 'react-native';
import moment from 'moment';

export default function ForecastList({ data }: { data: any[] }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>7-Day Forecast</Text>
      <FlatList
        data={data.slice(1, 8)} // skip today
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              <Text style={styles.day}>{moment.unix(item.dt).format('ddd')}</Text>
              <Text style={styles.temp}>{item.temp.day}°C</Text>
              <Text style={styles.desc}>{item.weather[0].main}</Text>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#2c3e50',
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 8,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  day: {
    color: '#ecf0f1',
    fontWeight: '600',
  },
  temp: {
    color: '#f1c40f',
  },
  desc: {
    color: '#3498db',
  },
});
