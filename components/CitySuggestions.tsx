import { useEffect, useState } from 'react';
import { TextInput, FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { fetchCitySuggestions } from '../services/cityService';

export default function CitySuggestions({ onCitySelect }: { onCitySelect: (city: string) => void }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.length >= 2) {
        const results = await fetchCitySuggestions(query);
        setSuggestions(results);
      } else {
        setSuggestions([]);
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleSelect = (city: string) => {
    setQuery(city);
    setSuggestions([]);
    onCitySelect(city);
  };

  return (
    <View style={styles.wrapper}>
      <TextInput
        style={styles.input}
        placeholder="Search city..."
        placeholderTextColor="#ccc"
        value={query}
        onChangeText={setQuery}
      />
      {suggestions.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item, index) => `${item}-${index}`}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelect(item)} style={styles.suggestion}>
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          )}
          style={styles.suggestionList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    zIndex: 999,
  },
  input: {
    height: 45,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
  },
  suggestionList: {
    backgroundColor: '#34495e',
    borderRadius: 8,
    marginTop: 4,
  },
  suggestion: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#2c3e50',
  },
  suggestionText: {
    color: '#fff',
  },
});
