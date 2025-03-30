import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import {Colors} from '../../constants/colors';
import CustomButton from '../../components/CustomButton';

const LoginScreen = ({navigation}) => {
  const colorScheme = useColorScheme(); // Detects light/dark mode
  const textColor = colorScheme === 'dark' ? Colors.darkText : Colors.lightText;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff'},
      ]}>
      <Text style={[styles.title, {color: textColor}]}>Welcome to Saifty!</Text>
      <Text style={[styles.subtitle, {color: textColor}]}>
        Keep your data safe!
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={Colors.placeholder}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor={Colors.placeholder}
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />

      <CustomButton
        title="Login"
        onPress={() => console.log('Login Pressed')}
      />

      <TouchableOpacity onPress={() => console.log('Forgot Password Pressed')}>
        <Text style={[styles.forgotPassword, {color: Colors.primary}]}>
          Forgot password?
        </Text>
      </TouchableOpacity>

      <Text style={[styles.registerText, {color: textColor}]}>
        Don't have an account?
        <Text
          style={{color: Colors.primary}}
          onPress={() => navigation.navigate('Register')}>
          {' Register!'}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: Colors.inputBg,
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
  },
  forgotPassword: {
    marginTop: 10,
    fontSize: 14,
  },
  registerText: {
    marginTop: 20,
    fontSize: 14,
  },
});

export default LoginScreen;
