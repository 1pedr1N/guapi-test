import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

interface InputWithLabelProps {
  label: string;
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  inputType: 'default' | 'numeric' | 'email' | 'phone' | 'password';
}

const InputWithLabel = ({ label, placeholder, value, onChangeText, inputType }: InputWithLabelProps) => {
  const handleTextChange = (text: string) => {
    if (inputType === 'default') {
      onChangeText(text);
      return;
    }

    let sanitizedText = text.replace(/[^0-9.]/g, '');

    if (inputType === 'numeric') {
      const decimalCount = sanitizedText.split('.').length - 1;
      if (decimalCount > 1) {
        return; 
      }
    }

    onChangeText(sanitizedText);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={handleTextChange}
        keyboardType={inputType === 'numeric' ? 'numeric' : inputType === 'email' ? 'email-address' : inputType === 'phone' ? 'phone-pad' : 'default'}
        secureTextEntry={inputType === 'password'} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
  },
});

export default InputWithLabel;
