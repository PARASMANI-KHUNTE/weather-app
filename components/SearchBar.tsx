import { TextInput, StyleSheet } from 'react-native';

interface Props {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

export default function SearchBar({ value, onChangeText, onSubmit }: Props) {
  return (
    <TextInput
      style={styles.input}
      placeholder="Search city..."
      placeholderTextColor="#ccc"
      value={value}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmit}
      returnKeyType="search"
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 45,
    backgroundColor: '#2c3e50',
    borderRadius: 8,
    paddingHorizontal: 15,
    color: '#fff',
    fontSize: 16,
  },
});
