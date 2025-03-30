import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '../constants/colors';

const CustomButton = ({title, onPress}) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: Colors.darkText,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
