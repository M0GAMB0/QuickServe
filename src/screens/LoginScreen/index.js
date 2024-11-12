import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function LoginScreen() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>QuickServe</Text>
      <Text style={styles.subHeader}>Login to Your Account</Text>

      <View style={styles.inputContainer}>
        <MaterialIcons name="email" size={24} color="#007ACC" />
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#A0A0A0"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputContainer}>
        <MaterialIcons name="lock" size={24} color="#007ACC" />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#A0A0A0"
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <MaterialIcons
            name={passwordVisible ? 'visibility' : 'visibility-off'}
            size={24}
            color="#007ACC"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signUp}>New here? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F8FF',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 32,
    color: '#007ACC',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  subHeader: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#007ACC',
    marginBottom: 20,
    paddingBottom: 5,
    width: '100%',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#007ACC',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
    width: '100%',
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#007ACC',
    textAlign: 'center',
    marginBottom: 20,
  },
  signUp: {
    color: '#007ACC',
    textAlign: 'center',
    fontWeight: '500',
  },
});
